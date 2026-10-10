import { Pandal, Review, VisitPlanItem } from '../types';

const STORAGE_KEYS = {
  PANDALS: 'pandal_hopper_user_pandals_v2',
  NEXT_VISIT: 'pandal_hopper_user_plans_v2',
  USER_LOCATION: 'pandal_hopper_last_location_v1'
};

export function getStoredPandals(): Pandal[] {
  try {
    // Clean up any legacy pre-seeded storage so default dummy markers are removed
    try {
      localStorage.removeItem('pandal_hopper_pandals_v1');
      localStorage.removeItem('pandal_hopper_next_visit_v1');
    } catch {
      // ignore
    }

    const data = localStorage.getItem(STORAGE_KEYS.PANDALS);
    if (!data) {
      return [];
    }
    const parsed = JSON.parse(data) as Pandal[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse stored pandals', err);
    return [];
  }
}

export function saveStoredPandals(pandals: Pandal[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PANDALS, JSON.stringify(pandals));
  } catch (err) {
    console.error('Failed to save pandals to storage', err);
  }
}

export function addPandalToStorage(newPandal: Pandal): Pandal[] {
  const current = getStoredPandals();
  const updated = [newPandal, ...current];
  saveStoredPandals(updated);
  return updated;
}

export function deletePandalFromStorage(pandalId: string): Pandal[] {
  const current = getStoredPandals();
  const updated = current.filter(p => p.id !== pandalId);
  saveStoredPandals(updated);
  return updated;
}

export function clearAllPandalsFromStorage(): Pandal[] {
  saveStoredPandals([]);
  return [];
}

export function addReviewToPandal(pandalId: string, review: Review): Pandal[] {
  const current = getStoredPandals();
  const updated = current.map(p => {
    if (p.id === pandalId) {
      const newReviews = [review, ...(p.reviews || [])];
      const newReviewCount = (p.reviewCount || 0) + 1;
      const totalScore = newReviews.reduce((sum, r) => sum + r.rating, 0);
      const newAvgRating = Number((totalScore / newReviews.length).toFixed(1));
      return {
        ...p,
        reviews: newReviews,
        reviewCount: newReviewCount,
        rating: newAvgRating,
        photosPostedCount: review.photos && review.photos.length > 0 
          ? p.photosPostedCount + review.photos.length 
          : p.photosPostedCount,
        images: review.photos && review.photos.length > 0 
          ? [...p.images, ...review.photos] 
          : p.images
      };
    }
    return p;
  });

  saveStoredPandals(updated);
  return updated;
}

export function getStoredVisitPlans(): VisitPlanItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.NEXT_VISIT);
    if (!data) {
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to get visit plans', err);
    return [];
  }
}

export function saveStoredVisitPlans(plans: VisitPlanItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.NEXT_VISIT, JSON.stringify(plans));
  } catch (err) {
    console.error('Failed to save visit plans', err);
  }
}
