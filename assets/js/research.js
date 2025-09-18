'use strict';

/**
 * Research Paper Abstract Functionality
 * Handles click-to-expand abstracts for research papers
 */

document.addEventListener('DOMContentLoaded', function() {
    initResearchInteractions();
});

/**
 * Initialize research paper click interactions
 */
function initResearchInteractions() {
    const researchItems = document.querySelectorAll('.research-item');
    
    researchItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Prevent any default behavior
            e.preventDefault();
            
            // Toggle the expanded state
            toggleResearchAbstract(this);
        });
        
        // Add keyboard accessibility
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleResearchAbstract(this);
            }
        });
        
        // Make it focusable for keyboard navigation
        if (!item.hasAttribute('tabindex')) {
            item.setAttribute('tabindex', '0');
        }
    });
}

/**
 * Toggle research paper abstract visibility
 * @param {HTMLElement} researchItem - The research item element
 */
function toggleResearchAbstract(researchItem) {
    const abstract = researchItem.querySelector('.research-abstract');
    const clickHint = researchItem.querySelector('.click-hint');
    
    if (!abstract) {
        console.warn('No abstract found for research item');
        return;
    }
    
    const isExpanded = researchItem.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse the abstract
        collapseAbstract(researchItem, abstract, clickHint);
    } else {
        // Expand the abstract
        expandAbstract(researchItem, abstract, clickHint);
    }
}

/**
 * Expand research abstract
 * @param {HTMLElement} researchItem - The research item element
 * @param {HTMLElement} abstract - The abstract element
 * @param {HTMLElement} clickHint - The click hint element
 */
function expandAbstract(researchItem, abstract, clickHint) {
    // Add expanded class
    researchItem.classList.add('expanded');
    
    // Hide click hint
    if (clickHint) {
        clickHint.style.display = 'none';
    }
    
    // Show abstract with animation
    abstract.style.display = 'block';
    
    // Force reflow to ensure the display change is applied
    abstract.offsetHeight;
    
    // Add animation class
    abstract.classList.add('expanding');
    
    // Update ARIA attributes for accessibility
    researchItem.setAttribute('aria-expanded', 'true');
    abstract.setAttribute('aria-hidden', 'false');
    
    // Scroll the expanded item into view if needed
    setTimeout(() => {
        scrollIntoViewIfNeeded(researchItem);
    }, 100);
}

/**
 * Collapse research abstract
 * @param {HTMLElement} researchItem - The research item element
 * @param {HTMLElement} abstract - The abstract element
 * @param {HTMLElement} clickHint - The click hint element
 */
function collapseAbstract(researchItem, abstract, clickHint) {
    // Remove expanded class
    researchItem.classList.remove('expanded');
    
    // Show click hint
    if (clickHint) {
        clickHint.style.display = 'block';
    }
    
    // Add collapsing animation
    abstract.classList.add('collapsing');
    
    // Hide abstract after animation
    setTimeout(() => {
        abstract.style.display = 'none';
        abstract.classList.remove('expanding', 'collapsing');
    }, 300);
    
    // Update ARIA attributes for accessibility
    researchItem.setAttribute('aria-expanded', 'false');
    abstract.setAttribute('aria-hidden', 'true');
}

/**
 * Scroll element into view if it's not fully visible
 * @param {HTMLElement} element - Element to scroll into view
 */
function scrollIntoViewIfNeeded(element) {
    const rect = element.getBoundingClientRect();
    const isVisible = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    
    if (!isVisible) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
        });
    }
}

/**
 * Close all expanded abstracts
 */
function closeAllAbstracts() {
    const expandedItems = document.querySelectorAll('.research-item.expanded');
    
    expandedItems.forEach(item => {
        toggleResearchAbstract(item);
    });
}

// Add CSS for animations if not already present
if (!document.getElementById('research-animations')) {
    const style = document.createElement('style');
    style.id = 'research-animations';
    style.textContent = `
        .research-abstract.expanding {
            animation: slideDown 0.3s ease-out;
        }
        
        .research-abstract.collapsing {
            animation: slideUp 0.3s ease-in;
        }
        
        @keyframes slideUp {
            from {
                opacity: 1;
                max-height: 200px;
                padding-top: 15px;
            }
            to {
                opacity: 0;
                max-height: 0;
                padding-top: 0;
            }
        }
    `;
    document.head.appendChild(style);
}