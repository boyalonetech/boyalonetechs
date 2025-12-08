// components/LikeButton.tsx
"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  projectId: string;
  projectTitle: string;
  className?: string;
}

export default function LikeButton({ projectId, projectTitle, className = "" }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLikeStatus();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const fetchLikeStatus = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}/like`);
      const data = await res.json();
      if (data.success) {
        setLiked(data.liked);
        setLikeCount(data.likeCount);
      }
    } catch (error) {
      console.error("Error fetching like status:", error);
    }
  };

  const handleLike = async () => {
    if (loading) return;
    
    setLoading(true);
    const newLiked = !liked;
    const newCount = newLiked ? likeCount + 1 : Math.max(0, likeCount - 1);

    // Optimistic update
    setLiked(newLiked);
    setLikeCount(newCount);

    try {
      const res = await fetch(`/api/projects/${projectId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: newLiked ? 'like' : 'unlike' })
      });

      const data = await res.json();
      if (!data.success) {
        // Revert on error
        setLiked(!newLiked);
        setLikeCount(likeCount);
      }
    } catch (error) {
      console.error("Error updating like:", error);
      // Revert on error
      setLiked(!newLiked);
      setLikeCount(likeCount);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 font-medium rounded-lg hover:bg-white transition-all duration-200 shadow-md hover:shadow-lg ${className}`}
      title={liked ? `Unlike "${projectTitle}"` : `Like "${projectTitle}"`}
    >
      <Heart
        className={`w-5 h-5  ${liked ? "fill-red-500 text-red-500" : ""}`}
      />
      <span className="text-sm">
        {likeCount} {likeCount === 1 ? 'like' : 'likes'}
      </span>
    </button>
  );
}