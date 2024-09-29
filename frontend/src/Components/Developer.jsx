import React, { useState, useEffect, useRef } from 'react';

const developers = [
  {
    id: 1,
    name: 'Dhruv Singh',
    role: 'Backend developer',
    description:
      'Passionate developer with expertise in React, JavaScript, and Tailwind CSS.',
    image: 'https://via.placeholder.com/150',
    linkedin: '#',
    github: '#',
  },
  {
    id: 2,
    name: 'Aadithhya Thatipally',
    role: 'Full stack developer',
    description:
      'Backend expert with knowledge of Node.js, Express, and MongoDB.',
    image: 'https://via.placeholder.com/150',
    linkedin: '#',
    github: '#',
  },
  {
    id: 3,
    name: 'Ashutosh Singh',
    role: 'Data analyst',
    description:
      'Experienced full-stack developer skilled in MERN stack development.',
    image: 'https://via.placeholder.com/150',
    linkedin: '#',
    github: '#',
  },
  {
    id: 4,
    name: 'Goutam',
    role: 'Frontend developer',
    description:
      'Creative designer with a focus on user experience and interface design.',
    image: 'https://via.placeholder.com/150',
    linkedin: '#',
    github: '#',
  },
  {
    id: 5,
    name: 'Paras Rana',
    role: 'Data analysis',
    description:
      'Automation and infrastructure expert, focused on continuous integration and delivery.',
    image: 'https://via.placeholder.com/150',
    linkedin: '#',
    github: '#',
  },
  {
    id: 6,
    name: 'Priyanka Pawar',
    role: 'UI/UX designer',
    description:
      'Mobile developer with a passion for building sleek and performant apps.',
    image: 'https://via.placeholder.com/150',
    linkedin: '#',
    github: '#',
  },
];

const Developer = () => {
  const [animate, setAnimate] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500); // Delay before animation starts

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const scrollStep = 1; // Adjust for speed

    if (window.innerWidth <= 768) { // Check if screen size is mobile
      const autoScroll = () => {
        if (scrollContainer) {
          scrollAmount += scrollStep;
          if (scrollAmount > scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollAmount = 0; // Reset scroll position to start
          }
          scrollContainer.scrollLeft = scrollAmount;
        }
      };

      const intervalId = setInterval(autoScroll, 30); // Adjust the interval for smooth scrolling

      return () => clearInterval(intervalId); // Cleanup the interval
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-white-500">
      <div
        ref={scrollRef}
        className={`flex flex-nowrap gap-6 transition-transform duration-1000 ease-in-out ${
          animate ? 'translate-x-0' : 'translate-x-[-100vw]'
        }`}
      >
        {developers.map((developer) => (
          <div
            key={developer.id}
            className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-300"
            style={{ width: '200px', height: '350px' }} // Set card dimensions
          >
            <div className="flex items-center justify-center bg-gray-800 h-32">
              <img
                className="rounded-full w-24 h-24 border-2 border-white"
                src={developer.image}
                alt={developer.name}
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-1">
                {developer.name}
              </h2>
              <p className="text-gray-600 mb-2">{developer.role}</p>
              <p className="text-gray-500 mb-4">{developer.description}</p>
              <div className="flex justify-between text-sm">
                <a href={developer.linkedin} className="text-blue-500 hover:underline">
                  LinkedIn
                </a>
                <a href={developer.github} className="text-blue-500 hover:underline">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developer;
