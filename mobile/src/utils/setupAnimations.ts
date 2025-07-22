// File: client/src/config/animations.ts

// Import the types from your shared 'types' package
// Ensure the import path is correct for your monorepo setup.
// It might be '@<your-project-name>/types' if you have paths aliasing set up,
// or a relative path like '../../packages/types/src/interface/animation'.
// Or, if shared/dist directly exports from 'interface/animation':
// import type { AnimationData, AnimationType } from 'shared/dist/interface/animation';
import type { App } from 'vue'

/**
 * Helper function to create the path to an animation asset.
 * Assumes your Lottie JSON files are in `client/src/assets/anim/`.
 * Vite will correctly handle these paths during development and build.
 *
 * @param filename - The name of the JSON file (e.g., 'avatar_xp.json')
 * @returns The path to be used by a Lottie fps.
 */
const animationAssetPath = (filename: string): string => `/src/assets/anim/${filename}`

/**
 * Defines a registry for all globally available Lottie animations.
 * Each key is a unique identifier for an animation, and the value
 * is an AnimationData object describing it.
 */
interface GlobalAnimationRegistry {
  [key: string]: AnimationConfig
}

/**
 * This constant object, `globalAnimations`, effectively serves as the output
 * of "setting up global animations". It's a declarative way to define
 * all animation configurations in one place.
 */
export const globalAnimations: Readonly<GlobalAnimationRegistry> = Object.freeze({
  AVATAR_XP: {
    name: 'AvatarXP',
    spriteDataUrl: animationAssetPath('avatar_xp.json'),
    spritesheetUrl: animationAssetPath('avatar_xp.png'),
    type: 'info' as AnimationType, // Using 'as AnimationType' for string literal assertion
    loop: false,
    autoplay: true,
    fps: 60,
  },
  LEADERBOARD_NEW: {
    name: 'LeaderboardNew',
    spriteDataUrl: animationAssetPath('avatar_xp.json'),
    spritesheetUrl: animationAssetPath('avatar_xp.png'),
    type: 'info' as AnimationType,
    description: 'Animation for new leaderboard updates or entries.',
    loop: true,
    autoplay: true,
    fps: 60,
  },
  PARTICLE_EFFECT_0: {
    name: 'ParticleEffect0',
    spriteDataUrl: animationAssetPath('avatar_xp.json'),
    spritesheetUrl: animationAssetPath('avatar_xp.png'),
    type: 'none' as AnimationType,
    description: 'Generic particle effect 0.',
    loop: true,
    autoplay: true,
    fps: 60,
  },
  PARTICLE_EFFECT_1: {
    name: 'ParticleEffect1',
    spriteDataUrl: animationAssetPath('avatar_xp.json'),
    spritesheetUrl: animationAssetPath('avatar_xp.png'),
    type: 'none' as AnimationType,
    description: 'Generic particle effect 1.',
    loop: true,
    autoplay: true,
    fps: 60,
  },
  PARTICLE_EFFECT_2: {
    name: 'ParticleEffect2',
    spriteDataUrl: animationAssetPath('avatar_xp.json'),
    spritesheetUrl: animationAssetPath('avatar_xp.png'),
    type: 'none' as AnimationType,
    description: 'Generic particle effect 2.',
    loop: true,
    autoplay: true,
    fps: 60,
  },
  PARTICLE_EFFECT_3: {
    name: 'ParticleEffect3',
    spriteDataUrl: animationAssetPath('avatar_xp.json'),
    spritesheetUrl: animationAssetPath('avatar_xp.png'),
    type: 'none' as AnimationType,
    description: 'Generic particle effect 3.',
    loop: true,
    autoplay: true,
    fps: 60,
  },
  VAULT_OPEN: {
    name: 'VaultOpen',
    spriteDataUrl: animationAssetPath('avatar_xp.json'),
    spritesheetUrl: animationAssetPath('avatar_xp.png'),
    type: 'success' as AnimationType,
    description: 'Animation for opening a vault or claiming a reward.',
    loop: false,
    autoplay: false,
    fps: 60,
  },
  SPIN_WHEEL: {
    name: 'SpinWheel',
    spriteDataUrl: animationAssetPath('avatar_xp.json'),
    spritesheetUrl: animationAssetPath('avatar_xp.png'),
    type: 'info' as AnimationType,
    description: 'Animation for a spinning prize wheel.',
    loop: false,
    autoplay: false,
    fps: 60,
  },
  // Add other Lottie JSON animations from your 'client/src/assets/anim/' directory here
  // Example:
  // MY_CUSTOM_ANIMATION: {
  //   name: 'MyCustomAnimation',
  //   path: animationAssetPath('my_custom_animation.json'), // if you add this file
  //   type: 'info' as AnimationType,
  //   loop: true,
  //   autoplay: true,
  //   fps: 60,
  // },
})

/**
 * The `setupGlobalAnimations` function in this context is conceptualized
 * as the process of defining and exporting the `globalAnimations` registry.
 * It makes the structured animation data available to the rest of the application.
 *
 * In a more imperative setup, this function might register these animations
 * with a global store or Vue plugin, but simply exporting the configuration
 * object is a common and effective pattern.
 *
 * @returns The frozen object containing all global animation definitions.
 */
export function setupGlobalAnimations(): Readonly<GlobalAnimationRegistry> {
  // In this declarative approach, the "setup" is the definition of globalAnimations.
  // If pre-loading or other side effects were needed, they could go here.
  console.log('[Animations] Global Lottie animations registry initialized.')
  return globalAnimations
}

/**
 * Utility function to easily retrieve a specific animation's data by its key.
 *
 * @param animationName - The key of the animation in the globalAnimations registry.
 * @returns The AnimationData object for the requested animation, or undefined if not found.
 */
export function getAnimationData(
  animationName: keyof typeof globalAnimations
): AnimationConfig | undefined {
  return globalAnimations[animationName]
}

import type { AnimationConfig, AnimationType } from '@/interfaces'
// If you want to use this as a Vue plugin to make animations globally accessible:


export const GlobalAnimationsPlugin = {
  install: (app: App) => {
    const animations = setupGlobalAnimations()
   
    
    // Make animations available globally, e.g., via provide/inject or app.config.globalProperties
    app.config.globalProperties.$animations = animations
    app.provide('globalAnimations', animations)
    console.log('[Animations] GlobalAnimationsPlugin installed.')
  },
}

// Then in your main.ts:
// import { GlobalAnimationsPlugin } from './utils/setupAnimations';
// const app = createApp(App);
// app.use(GlobalAnimationsPlugin);
// app.mount('#app');
