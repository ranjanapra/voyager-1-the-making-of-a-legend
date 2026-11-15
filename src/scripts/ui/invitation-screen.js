/**
 * Section 02 — The Invitation Controller
 * 
 * Manages the Invitation interactions:
 * 1. "LET'S TRY TO BUILD IT" -> Opens the independent full-page Build Experience.
 * 2. "I JUST WANT TO EXPLORE" -> Smoothly scrolls vertically to Section 03 (Explore Voyager 1).
 */

export function initInvitationScreen(scrollController) {
  const buildBtn = document.getElementById('btn-choice-build');
  const exploreChoiceBtn = document.getElementById('btn-choice-explore');

  // Choice 1: LET'S TRY TO BUILD IT -> Open independent Build Experience page
  if (buildBtn) {
    buildBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (scrollController && typeof scrollController.openIndependentPage === 'function') {
        scrollController.openIndependentPage('build');
      } else {
        window.location.hash = '#build';
      }
    });
  }

  // Choice 2: I JUST WANT TO EXPLORE -> Smoothly scroll to Section 03 on main website
  if (exploreChoiceBtn) {
    exploreChoiceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (scrollController && typeof scrollController.scrollToSection === 'function') {
        scrollController.scrollToSection('explore');
      } else {
        document.getElementById('section-explore')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
