import type { SpriteDefinition, FrameData } from '@/types/sprites';

/**
 * Parses sprite data from various texture atlas formats into a consistent,
 * reliable internal format. This function is designed to be defensive and
 * handle multiple JSON structures gracefully.
 * @param data - Raw JSON data from the texture atlas.
 * @param spriteName - The name of the sprite for logging purposes.
 * @returns A normalized SpriteDefinition object.
 */
export function normalizeSpriteData(data: any, spriteName: string): SpriteDefinition {
  const frames: Record<string, FrameData> = {};
  const animations: Record<string, string[]> = {};
  const meta = data.metadata || data.meta || {};

  const parsePoint = (p: string | {x: number, y: number}): { x: number, y: number } => {
    if (typeof p === 'object') return p;
    const nums = p.match(/-?\d+(\.\d+)?/g)?.map(Number) || [0, 0];
    return { x: nums[0], y: nums[1] };
  };

  const parseSize = (s: string | {w: number, h: number}): { w: number, h: number } => {
    if (typeof s === 'object') return s;
    const nums = s.match(/-?\d+(\.\d+)?/g)?.map(Number) || [0, 0];
    return { w: nums[0], h: nums[1] };
  };

  const parseRect = (r: string | {x:number, y:number, w:number, h:number}): { x: number, y: number, w: number, h: number } => {
    if (typeof r === 'object') return r;
    const nums = r.match(/-?\d+(\.\d+)?/g)?.map(Number) || [0, 0, 0, 0];
    return { x: nums[0], y: nums[1], w: nums[2], h: nums[3] };
  };

  const frameSource = Array.isArray(data.frames) ? data.frames : Object.entries(data.frames);

  for (const item of frameSource) {
    let frameName: string;
    let rawFrame: any;

    if(Array.isArray(item)) {
        [frameName, rawFrame] = item;
    } else {
        rawFrame = item;
        frameName = rawFrame.filename;
    }

    if (!frameName) continue;

    const sourceSize = parseSize(rawFrame.sourceSize || rawFrame.spriteSourceSize);
    const frameRect = parseRect(rawFrame.frame || rawFrame.textureRect);
    const spriteSourceSizeRect = rawFrame.spriteSourceSize ? parseRect(rawFrame.spriteSourceSize) : { x: 0, y: 0, w: sourceSize.w, h: sourceSize.h};

    frames[frameName] = {
      frame: frameRect,
      spriteSourceSize: spriteSourceSizeRect,
      sourceSize: sourceSize,
      rotated: rawFrame.rotated || rawFrame.textureRotated || false,
      trimmed: rawFrame.trimmed || false,
    };
  }

  if (meta.animations && meta.animations.length > 0) {
    meta.animations.forEach((animName: string) => {
      animations[animName] = Object.keys(frames)
        .filter(frameName => frameName.includes(`/${animName}/`))
        .sort();
    });
  } else {
    const defaultAnimationName = 'default';
    animations[defaultAnimationName] = Object.keys(frames).sort();
  }

  return {
    metadata: {
      image: meta.realTextureFileName || meta.textureFileName || meta.image,
      size: parseSize(meta.size || '{0,0}'),
      scale: meta.scale || '1',
    },
    frames: frames,
    animations: animations,
  };
}