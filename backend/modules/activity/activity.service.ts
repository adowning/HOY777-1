import db from '../../db'
import { promos } from '../../db/schemelibsql'

export const findManyActivities = async () => {
  // Using promos table for now as there is no activity table
  const promotions = await db.select().from(promos)
  const groupedPromotions: Record<
    number,
    { group_id: number; group_name: string; list_data: unknown[] }
  > = {}

  promotions.forEach((promo) => {
    const groupId = promo.promoGroupId ?? 0 // Use a default group if null
    if (!groupedPromotions[groupId]) {
      groupedPromotions[groupId] = {
        group_id: groupId,
        group_name: 'General', // Placeholder
        list_data: [],
      }
    }
    groupedPromotions[groupId].list_data.push({
      id: promo.id,
      name: promo.name,
      image_path: promo.imagePath,
      text: promo.text,
      desc: promo.desc,
      countdown: promo.countdown,
      content: promo.content,
      click_feedback: promo.clickFeedback,
      button_path: promo.buttonPath,
      button_text: promo.buttonText,
    })
  })

  return {
    group_data: Object.values(groupedPromotions),
  }
}
