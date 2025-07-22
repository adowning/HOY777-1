
var MINIMUM_VIP_POINTS_FOR_TIER = [
  0,
  500,
  5000,
  45 * 1000,
  500 * 1000,
  1250 * 1000,
]
var VIP_POINTS_TO_NEXT_TIER = Array.from(MINIMUM_VIP_POINTS_FOR_TIER
  .slice(0, -1)
  .map(function (points: number, tier: number) {
    return MINIMUM_VIP_POINTS_FOR_TIER[tier + 1]! - MINIMUM_VIP_POINTS_FOR_TIER[tier]!;
  })
  .values());


export function getXPForLevel(level: number) {
  if (level <= 1) {
    return 0;
  } else {
    return (45 + (level - 1) * (30 + level) * (level - 2));
  }
};

export function getLevelForXP(xp: number) {
  if (xp <= 0) {
    return 1;
  }

  for (var level = 1; xp >= getXPForLevel(level); level++);
  return (level - 1);
};

export function getXPToNextLevel(currentXP: number) {
  var currentLevel = getLevelForXP(currentXP);
  var lowXP = getXPForLevel(currentLevel);
  var highXP = getXPForLevel(currentLevel + 1);
  return highXP - lowXP;
};

export function getXPProgress(currentXP: number) {
  var currentLevel = getLevelForXP(currentXP);
  var lowXP = getXPForLevel(currentLevel);
  return currentXP - lowXP;
};

export function getProgressToNextLevel(currentXP: number) {
  var currentLevel = getLevelForXP(currentXP);
  var lowXP = getXPForLevel(currentLevel);
  var highXP = getXPForLevel(currentLevel + 1);
  return ((currentXP - lowXP) / (highXP - lowXP));
};

export function getVIPTier(points: number) {
  var tier = 0;
  (VIP_POINTS_TO_NEXT_TIER).forEach(function (pointsNeeded: number) {
    if (points < pointsNeeded) {
      return false;
    } else {
      tier += 1;
      points -= pointsNeeded;
    }
  }, null);
  return tier;
};

/**
 * @param {number} points
 * @param {number} tier (Optional) Provide if known to avoid recomputation
 */
export function getProgressToNextVIPTier(points: number, tier?: number): number {
  // If tier is undefined, calculate it
  const calculatedTier = tier ?? getVIPTier(points);
  
  // Validate tier is within bounds
  if (calculatedTier < 0 || calculatedTier >= MINIMUM_VIP_POINTS_FOR_TIER.length - 1) {
    return 1; // Return 100% progress for invalid or max tier
  }
  
  // Get points for current and next tier
  const currentTierPoints = MINIMUM_VIP_POINTS_FOR_TIER[calculatedTier] as number;
  const nextTierPoints = MINIMUM_VIP_POINTS_FOR_TIER[calculatedTier + 1] as number;
  const pointsToNextTier = nextTierPoints - currentTierPoints;
  
  // Calculate progress
  return (points - currentTierPoints) / pointsToNextTier;
}

export function getPointsToNextVIPTier(points: number, tier: number) {
  if (arguments.length < 2) {
    tier = getVIPTier(points);
  }

  var nextTier = tier + 1;
  if (nextTier < MINIMUM_VIP_POINTS_FOR_TIER.length) {
    return MINIMUM_VIP_POINTS_FOR_TIER[nextTier]! - points;
  } else {
    return 0;
  }
};