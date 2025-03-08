import { getAuthHeaders } from "../utils/auth";

export const fetchMentorData = async () => {
  try {
    // This is where you'd make the actual API call when ready
    // const response = await fetch('http://your-api-url/mentor/profile', {
    //   headers: getAuthHeaders()
    // });
    // if (!response.ok) {
    //   throw new Error('Failed to fetch mentor data');
    // }
    // return await response.json();

    // For now, return mock data
    return {
      name: "ahmed rashad",
      title: "Senior React Developer",
      bio: "Experienced developer with 5+ years in React and frontend technologies",
      expertise: ["React", "JavaScript", "Node.js"],
      contactEmail: "ahmed@example.com",
      phone: "01024715090",
    };
  } catch (error) {
    console.error("Error fetching mentor data:", error);
    throw error;
  }
};

export const fetchScheduledMeetings = async () => {
  try {
    // This is where you'd make the actual API call when ready
    // const response = await fetch('http://your-api-url/api/v1/sessions', {
    //   headers: getAuthHeaders()
    // });
    // if (!response.ok) {
    //   throw new Error('Failed to fetch scheduled meetings');
    // }
    // return await response.json();

    // For now, return mock data
    return [
      {
        id: "1",
        title: "React Hooks Deep Dive",
        price: 50,
        description: "A session covering advanced React hooks concepts.",
        duration: 60,
        schedule_time: "2023-07-15T10:00:00",
        status: "pending",
        has_room: false,
      },
      {
        id: "2",
        title: "JavaScript Fundamentals",
        price: 35,
        description: "Reviewing core JavaScript concepts for beginners.",
        duration: 45,
        schedule_time: "2023-07-18T14:30:00",
        status: "pending",
        has_room: false,
      },
    ];
  } catch (error) {
    console.error("Error fetching scheduled meetings:", error);
    throw error;
  }
};

export const createMeeting = async (meetingData) => {
  try {
    // This is where you'd make the actual API call when ready
    // const response = await fetch('http://your-api-url/api/v1/sessions', {
    //   method: 'POST',
    //   headers: {
    //     ...getAuthHeaders(),
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(meetingData)
    // });
    // if (!response.ok) {
    //   throw new Error('Failed to create meeting');
    // }
    // return await response.json();

    // For now, return mock data
    return {
      id: Date.now().toString(),
      ...meetingData,
    };
  } catch (error) {
    console.error("Error creating meeting:", error);
    throw error;
  }
};

export const createInstantMeeting = async () => {
  try {
    // This is where you'd make the actual API call when ready
    // const response = await fetch('http://your-api-url/api/v1/meetings/instant', {
    //   method: 'POST',
    //   headers: {
    //     ...getAuthHeaders(),
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     title: `Instant Meeting - ${new Date().toLocaleString()}`,
    //     description: "Instant meeting session",
    //     duration: 60, // Default duration in minutes
    //     status: "active",
    //     has_room: true
    //   })
    // });
    // if (!response.ok) {
    //   throw new Error('Failed to create instant meeting');
    // }
    // return await response.json();

    // For now, return mock data
    return {
      id: `meeting-${Date.now()}`,
      title: `Instant Meeting - ${new Date().toLocaleString()}`,
      description: "Instant meeting session",
      duration: 60,
      status: "active",
      has_room: true,
    };
  } catch (error) {
    console.error("Error creating instant meeting:", error);
    throw error;
  }
};

export const updateMentorProfile = async (profileData) => {
  try {
    // This is where you'd make the actual API call when ready
    // const response = await fetch('http://your-api-url/mentor/profile', {
    //   method: 'PUT',
    //   headers: {
    //     ...getAuthHeaders(),
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(profileData)
    // });
    // if (!response.ok) {
    //   throw new Error('Failed to update profile');
    // }
    // return await response.json();

    // For now, return mock data
    return {
      ...profileData,
      updated_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error updating mentor profile:", error);
    throw error;
  }
};
