
import axios from "axios";

const StatsData = async () => {
  try {
    const [teachersRes, eventsRes] = await Promise.all([
      axios.get("http://localhost:5001/api/public/teachers"),
      axios.get("http://localhost:5001/api/public/events"),
    ]);

    const teachers = teachersRes.data.data;
    const events = eventsRes.data.data;

    const professor = teachers.filter((t) => {
      const firstWord = t.designation?.trim().toLowerCase().split(" ")[0];
      return firstWord === "professor";
    }).length;

    const associateCount = teachers.filter((t) =>
      t.designation?.toLowerCase().includes("associate")
    ).length;

    const assistantCount = teachers.filter((t) =>
      t.designation?.toLowerCase().includes("assistant")
    ).length;

    const nonTeachingCount = teachers.filter((t) =>
      t.designation?.toLowerCase().includes("non")
    ).length;

    const statsData = [
      { title: "Teaching staff", value: `${teachers.length}` },
      { title: "Professors", value: `${professor}` },
      { title: "Associate Professors", value: `${associateCount}` },
      { title: "Assistant Professors", value: `${assistantCount}` },
      { title: "Non-teaching Staff", value: `${nonTeachingCount}` },
      { title: "Events conducted", value: `${events.length}` },
      { title: "VTU Ranks", value: "500+" },
      { title: "Successful trades", value: "10k" },
     
    ];

    return statsData;
  } catch (error) {
    console.error("Error loading statsData:", error);
    return [
      { title: "Expert instructors", value: "0" },
      { title: "Events conducted", value: "0" },
      { title: "Associate Professors", value: "0" },
      { title: "Assistant Professors", value: "0" },
      { title: "Non-teaching Staff", value: "0" },
      { title: "Study Guides", value: "500+" },
      { title: "Successful trades", value: "10k" },
    
    ];
  }
};

export default StatsData;
