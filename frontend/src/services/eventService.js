import api from './api';

/**
 * Event Service
 * 
 * This service handles all event-related API calls.
 * Used by both public pages (viewing events) and admin pages (managing events).
 * 
 * Features:
 * - Get all events (with filtering and pagination)
 * - Get single event details
 * - Create new events (admin only)
 * - Update existing events (admin only)
 * - Delete events (admin only)
 * - Search and filter events
 */
class EventService {
  
  // ============ PUBLIC METHODS ============
  
  /**
   * Get all events (public endpoint)
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number for pagination
   * @param {number} params.limit - Number of items per page
   * @param {string} params.search - Search query
   * @param {string} params.branch - Filter by branch
   * @param {string} params.sort - Sort order (date, title, etc.)
   */
  async getAllEvents(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await api.get(`/public/events?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch events');
    }
  }

  /**
   * Get single event details (public endpoint)
   * @param {string} eventId - Event ID
   */
  async getEventById(eventId) {
    try {
      const response = await api.get(`/public/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch event details');
    }
  }

  /**
   * Get featured events for homepage
   * @param {number} limit - Number of featured events to fetch
   */
  async getFeaturedEvents(limit = 3) {
    try {
      const response = await api.get(`/public/events?featured=true&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured events');
    }
  }

  /**
   * Search events by query
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   */
  async searchEvents(query, filters = {}) {
    try {
      const params = {
        search: query,
        ...filters
      };
      return await this.getAllEvents(params);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search events');
    }
  }

  // ============ ADMIN METHODS ============

  /**
   * Get all events (admin endpoint with more details)
   * @param {Object} params - Query parameters
   */
  async getAdminEvents(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await api.get(`/admin/events?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch admin events');
    }
  }

  /**
   * Get single event for admin (with full details)
   * @param {string} eventId - Event ID
   */
  async getAdminEventById(eventId) {
    try {
      const response = await api.get(`/admin/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch event details');
    }
  }

  /**
   * Create a new event (admin only)
   * @param {Object} eventData - Event data
   * @param {string} eventData.title - Event title
   * @param {string} eventData.description - Event description
   * @param {string} eventData.date - Event date
   * @param {string} eventData.venue - Event venue
   * @param {string} eventData.branch - Event branch
   * @param {File} eventData.image - Event image file
   */
  async createEvent(eventData) {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append all event data
      Object.keys(eventData).forEach(key => {
        if (eventData[key] !== null && eventData[key] !== undefined) {
          formData.append(key, eventData[key]);
        }
      });

      const response = await api.post('/admin/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create event');
    }
  }

  /**
   * Update an existing event (admin only)
   * @param {string} eventId - Event ID
   * @param {Object} eventData - Updated event data
   */
  async updateEvent(eventId, eventData) {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append all event data
      Object.keys(eventData).forEach(key => {
        if (eventData[key] !== null && eventData[key] !== undefined) {
          formData.append(key, eventData[key]);
        }
      });

      const response = await api.put(`/admin/events/${eventId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update event');
    }
  }

  /**
   * Delete an event (admin only)
   * @param {string} eventId - Event ID
   */
  async deleteEvent(eventId) {
    try {
      const response = await api.delete(`/admin/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete event');
    }
  }

  /**
   * Upload event image
   * @param {File} imageFile - Image file
   */
  async uploadEventImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await api.post('/admin/events/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload image');
    }
  }

  // ============ UTILITY METHODS ============

  /**
   * Get event statistics (admin)
   */
  async getEventStats() {
    try {
      const response = await api.get('/admin/events/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch event statistics');
    }
  }

  /**
   * Get events by date range
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   */
  async getEventsByDateRange(startDate, endDate) {
    try {
      const params = {
        startDate,
        endDate
      };
      return await this.getAllEvents(params);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch events by date range');
    }
  }

  /**
   * Get upcoming events
   * @param {number} limit - Number of events to fetch
   */
  async getUpcomingEvents(limit = 10) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const params = {
        startDate: today,
        sort: 'date',
        limit
      };
      return await this.getAllEvents(params);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch upcoming events');
    }
  }

  /**
   * Format event data for display
   * @param {Object} event - Raw event data
   */
  formatEventData(event) {
    return {
      ...event,
      formattedDate: new Date(event.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      formattedTime: event.time ? new Date(`2000-01-01T${event.time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }) : null,
      isUpcoming: new Date(event.date) > new Date(),
      isPast: new Date(event.date) < new Date()
    };
  }

  /**
   * Validate event data before submission
   * @param {Object} eventData - Event data to validate
   */
  validateEventData(eventData) {
    const errors = {};

    if (!eventData.title || eventData.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters long';
    }

    if (!eventData.date) {
      errors.date = 'Date is required';
    } else if (new Date(eventData.date) < new Date()) {
      errors.date = 'Event date must be in the future';
    }

    if (!eventData.venue || eventData.venue.trim().length < 3) {
      errors.venue = 'Venue must be at least 3 characters long';
    }

    if (eventData.description && eventData.description.length > 1000) {
      errors.description = 'Description must be less than 1000 characters';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

// Export singleton instance
export const eventService = new EventService();