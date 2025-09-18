'use strict';

/**
 * Main JavaScript file for the website
 * Handles navigation, sidebar, and common functionality
 */

// Element toggle function
const elementToggleFunc = function (elem) { 
    elem.classList.toggle("active"); 
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    
    // Sidebar functionality
    initSidebar();
    
    // Navigation functionality
    initNavigation();
    
});

/**
 * Initialize sidebar functionality
 */
function initSidebar() {
    const sidebar = document.querySelector("[data-sidebar]");
    const sidebarBtn = document.querySelector("[data-sidebar-btn]");

    if (sidebar && sidebarBtn) {
        // Sidebar toggle functionality for mobile
        sidebarBtn.addEventListener("click", function () { 
            elementToggleFunc(sidebar); 
        });
    }
}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.navbar-link');
    
    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Add click handlers for smooth transitions
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default navigation behavior
            // Just update active states for immediate feedback
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Utility function to show/hide elements
 */
function toggleElement(element, show = null) {
    if (show === null) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    } else {
        element.style.display = show ? 'block' : 'none';
    }
}

/**
 * Smooth scroll to top
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}