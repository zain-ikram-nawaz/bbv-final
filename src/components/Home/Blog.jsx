"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Choosing the Sprinter Camper Van for Sale",
    image: "/images/blog2.jpg",
    link: "#",
    description: "Why the Sprinter Camper Van Is A Game Changer Are you one of those who is more on the...",
    isFeatured: false,
  },
  {
    id: 2,
    title: "Living the Dream: How Camper Vans for Life Can Be Your Full-Time Home",
    image: "/images/blog1.jpg",
    link: "#",
    description: "With a sudden surge in property prices and a growing trend towards technology, more and more people are embracing van...",
    isFeatured: true,
  },
  {
    id: 3,
    title: "Reasons to choose a Camper Van for Life Adventures",
    image: "/images/blog3.jpg",
    link: "#",
    description: "Do you think about living truly free, having fun and going to a new location every day? The dream can...",
    isFeatured: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const BlogCard = ({ post, index }) => {
  const isFeatured = post.isFeatured;
  const [hovered, setHovered] = useState(false);

  const featuredBg = "#534BFF";
  const featuredBorder = "rgb(83 75 255 / 0.5)";
  const nonFeaturedBg = "#212121";
  const nonFeaturedBorder = "rgb(107 114 128 / 0.5)";

  return (
    <motion.div
      className={`relative w-full rounded-[2.5rem] p-6 transition-all duration-300
        ${isFeatured ? 'bg-[#534BFF]' : 'bg-[#212121]'}
        ${hovered ? "transform-gpu -translate-y-2 scale-[1.02] shadow-xl" : ""}
        ${isFeatured ? "pulsating-glow" : ""}`}
      style={{
        border: `2px solid ${isFeatured ? featuredBorder : nonFeaturedBorder}`,
      }}
      variants={cardVariants}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isFeatured && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold text-white border border-white/30">
          Featured
        </div>
      )}
      
      <div
        className={`w-full h-auto aspect-[10/12] relative overflow-hidden rounded-[1.5rem]
          border-4 bg-gray-900/40`}
        style={{
          borderColor: isFeatured ? featuredBg : "rgb(107 114 128)",
        }}
      >
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className={`object-cover transition-all duration-500 ease-in-out
              ${hovered ? 'scale-110 brightness-125' : 'scale-100 brightness-100'}`}
          />
        )}
        
        <div className={`absolute inset-0 p-6 flex flex-col justify-end text-white
              bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        </div>

      </div>

      <div className={`pt-4 transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}>
        <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
        <p className="text-sm text-gray-400">{post.description}</p>
      </div>

      <div className={`absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end items-center text-white
              transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-sm text-gray-200 mb-4">{post.description}</p>
        <Link
          href={post.link}
          className={`inline-flex items-center justify-center px-4 py-2 rounded-full font-semibold
            bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm text-white hover:bg-opacity-30
            transition-all duration-300 w-fit`}
        >
          Learn more <ArrowUpRight size={16} className="ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default function Blog() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    const results = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchQuery]);

  return (
    <>
      <style jsx>{`
        .animated-text-gradient {
          background-image: linear-gradient(
            to right,
            #00FFFF,  
            #140AFF,
            #534BFF,
            #800080,
            #140AFF,
            #00FFFF  
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 100%;
          animation: animated-gradient 6s ease-in-out infinite;
          
          color: #fff !important;  
        }
        @keyframes animated-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .bg-gradient-button {
          background-image: linear-gradient(
            to right,
            #534BFF,
            #140AFF,
            #800080,
            #534BFF
          );
          background-size: 200% auto;
          animation: button-gradient-animation 4s linear infinite;
        }
        @keyframes button-gradient-animation {
          from { background-position: 0% 50%; }
          to { background-position: -200% 50%; }
        }
        .pulsating-glow {
          animation: pulsating-glow 2s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(83, 75, 255, 0.4);
        }
        @keyframes pulsating-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(83, 75, 255, 0.4), inset 0 0 5px rgba(83, 75, 255, 0.2); }
          50% { box-shadow: 0 0 20px rgba(83, 75, 255, 0.8), inset 0 0 10px rgba(83, 75, 255, 0.4); }
        }
        .glare-active .glare-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.2) 80%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translateX(-100%) rotate(25deg);
          animation: shine-glare 1s forwards cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes shine-glare {
          to { transform: translateX(100%) rotate(25deg); }
        }
      `}</style>
      <section id="blog" className="relative py-20 bg-[#E9E9E9] text-gray-800">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Explore Our{" "}
            <span className="animated-text-gradient">
              Van Life Blog
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg mb-8 text-gray-600">
            Check our blog to learn everything about the vanlife, custom Sprinter vans, and other campervans.
          </p>

          <div className="max-w-md mx-auto mb-12">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-500"
            />
          </div>

          <motion.div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
          
          <div className="mt-16 text-center">
            <Link
              href="/blog"
              className="relative inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold overflow-hidden group shadow-lg text-white"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-button z-0"></span>
              <span className="relative z-10">See All Blogs</span>
              <ArrowUpRight size={18} className="ml-2 relative z-10" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}