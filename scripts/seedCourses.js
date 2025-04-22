const dbModule = require("../data/db");
const db = dbModule.coursesDB;

const courses = [
  {
    name: "Beginner Salsa",
    difficulty: "Beginner",
    description: "Learn basic Salsa footwork and partner moves.",
    duration: "6 weekly sessions",
    location: "Studio A",
    price: 200,
    imageUrl: "/images/salsa.jpg",
    sessions: [
      { date: "2025-05-01", time: "18:00" },
      { date: "2025-05-08", time: "18:00" },
      { date: "2025-05-15", time: "18:00" },
      { date: "2025-05-22", time: "18:00" },
      { date: "2025-05-29", time: "18:00" },
      { date: "2025-06-05", time: "18:00" },
    ],
  },
  {
    name: "Breakdance Basics",
    difficulty: "All Levels",
    description: "Groove with high energy breakdance moves and style.",
    duration: "6 weekly sessions",
    location: "Studio B",
    price: 200,
    imageUrl: "/images/breakdance.jpg",
    sessions: [
      { date: "2025-05-01", time: "19:00" },
      { date: "2025-05-08", time: "19:00" },
      { date: "2025-05-15", time: "19:00" },
      { date: "2025-05-22", time: "19:00" },
      { date: "2025-05-29", time: "19:00" },
      { date: "2025-06-05", time: "19:00" },
    ],
  },
  {
    name: "Ballet Foundations",
    difficulty: "Beginner",
    description: "Intro to classical ballet technique for newcomers.",
    duration: "6 weekly sessions",
    location: "Studio C",
    price: 200,
    imageUrl: "/images/ballet.jpg",
    sessions: [
      { date: "2025-05-02", time: "10:00" },
      { date: "2025-05-09", time: "10:00" },
      { date: "2025-05-16", time: "10:00" },
      { date: "2025-05-23", time: "10:00" },
      { date: "2025-05-30", time: "10:00" },
      { date: "2025-06-06", time: "10:00" },
    ],
  },
  {
    name: "Time to Tap",
    difficulty: "Intermediate",
    description: "Learn to tap dance in a fun environment.",
    duration: "6 weekly sessions",
    location: "Studio D",
    price: 200,
    imageUrl: "/images/tap.jpg",
    sessions: [
      { date: "2025-05-03", time: "17:30" },
      { date: "2025-05-10", time: "17:30" },
      { date: "2025-05-17", time: "17:30" },
      { date: "2025-05-24", time: "17:30" },
      { date: "2025-05-31", time: "17:30" },
      { date: "2025-06-07", time: "17:30" },
    ],
  },
];

// Clear out existing courses
db.remove({}, { multi: true }, (err) => {
  if (err) {
    console.error("Error clearing DB:", err);
  } else {
    // Insert the course data
    db.insert(courses, (err, newDocs) => {
      if (err) {
        console.error("Insert error:", err);
      } else {
        console.log(`✅ Seeded ${newDocs.length} courses successfully.`);
      }
    });
  }
});
