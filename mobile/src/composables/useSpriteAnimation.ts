import { ref, onMounted, onUnmounted, type Ref, type CSSProperties, computed } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import type { SpriteDefinition } from '@/types/sprites';
import { normalizeSpriteData } from './sprite-helpers/normalizeSpriteData';

// Vite-specific feature to dynamically import all our asset files
const jsonModules = import.meta.glob('/src/assets/anim/*.json');
const imageModules = import.meta.glob('/src/assets/anim/*.{png,jpg,webp,avif}', { as: 'url', eager: true });

export function useSpriteAnimation(spriteName: string, options: any = {}) {
  const { fps = 30, loop = false, animationToPlay, autoplay = false } = options;

  const styleObject: Ref<CSSProperties> = ref({});
  const error = ref<string | null>(null);
  const isLoading = ref(true);
  
  let animationFrameNames: string[] = [];
  let localSpriteData: SpriteDefinition | null = null;
  let imageUrl = '';
  let currentFrameIndex = 0;

  const animationLoop = () => {
    const frameName = animationFrameNames[currentFrameIndex];
    const frameData = localSpriteData?.frames[frameName];

    if (frameData) {
      // Keeping this log per your request
      console.log(`[useSpriteAnimation - ${spriteName}] Frame ${currentFrameIndex}/${animationFrameNames.length - 1}: ${frameName}`);

    styleObject.value = {
        position: 'absolute',
        width: `${frameData.frame.w}px`,
        height: `${frameData.frame.h}px`,
        backgroundImage: `url(${imageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-${frameData.frame.x}px -${frameData.frame.y}px`,
        transform: `translate(${frameData.spriteSourceSize.x}px, ${frameData.spriteSourceSize.y}px)`,
      };
      console.log({
        // position: 'absolute',
        width: `${frameData.frame.w}px`,
        height: `${frameData.frame.h}px`,
        backgroundImage: `url(${imageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-${frameData.frame.x}px -${frameData.frame.y}px`,
        transform: `translate(${frameData.spriteSourceSize.x}px, ${frameData.spriteSourceSize.y}px)`,
      })
    }

    currentFrameIndex++;
    if (currentFrameIndex >= animationFrameNames.length) {
      if (loop) {
        currentFrameIndex = 0;
      } else {
        pause(); // Stop the animation loop
      }
    }
  };
  
  const { isActive: isPlaying, pause, resume } = useIntervalFn(animationLoop, 1000 / fps, { immediate: false });
 const containerSize = computed(() => {
    if (isLoading.value || !localSpriteData || animationFrameNames.length === 0) {
      return { width: '0px', height: '0px' };
    }
    const firstFrameName = animationFrameNames[0];
    const firstFrame = localSpriteData.frames[firstFrameName];
    return {
      width: `${firstFrame.sourceSize.w}px`,
      height: `${firstFrame.sourceSize.h}px`,
    };
  });

  const play = (): void => {
    if (isPlaying.value || isLoading.value) return;
    currentFrameIndex = 0;
    animationLoop();
    resume();
  };

  const stop = (): void => {
    if (!isPlaying.value) return;
    pause();
  };

  onMounted(async () => {
    isLoading.value = true;
    try {
      const jsonPath = `/src/assets/anim/${spriteName}.json`;
      const jsonImporter = jsonModules[jsonPath];
      if (!jsonImporter) throw new Error(`JSON file not found for sprite: ${spriteName}`);
      
      const mod = await jsonImporter() as any;
      localSpriteData = normalizeSpriteData(mod.default || mod, spriteName);
      
      const imageName = localSpriteData.metadata.image;
      if (!imageName) throw new Error("No image name in sprite sheet metadata.");
      
      const imagePathKey = Object.keys(imageModules).find(p => p.includes(imageName.split('.')[0]));
      if (!imagePathKey) throw new Error(`Image file "${imageName}" not found.`);
      
      imageUrl = imageModules[imagePathKey];
      animationFrameNames = localSpriteData.animations[animationToPlay || 'default'];
      if (!animationFrameNames?.length) throw new Error(`Animation name "${animationToPlay || 'default'}" not found.`);

    } catch (e: any) {
      error.value = e.message;
      return;
    } finally {
      isLoading.value = false;
    }
    
    if (autoplay) {
      play();
    }
  });

  onUnmounted(stop);
  return { styleObject, containerSize, error, isLoading, isPlaying, play, stop };

}