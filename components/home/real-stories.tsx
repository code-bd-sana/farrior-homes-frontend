"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Title from "../shared/Title/Title";
import { getReviewVideos, type ReviewVideoItem } from "@/services/reviews";

type ReviewVideo = {
  src: string;
  label: string;
};

export default function RealStories() {
  const [videos, setVideos] = useState<ReviewVideo[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getVideosForIndex = (index: number): HTMLVideoElement[] => {
    if (!containerRef.current) {
      return [];
    }

    return Array.from(
      containerRef.current.querySelectorAll<HTMLVideoElement>(
        `video[data-review-index="${index}"]`,
      ),
    );
  };

  const getVisibleVideoForIndex = (index: number): HTMLVideoElement | null => {
    const candidates = getVideosForIndex(index);
    return (
      candidates.find((video) => video.offsetParent !== null) ||
      candidates[0] ||
      null
    );
  };

  const pauseAndResetNonActiveVideos = (index: number) => {
    if (!containerRef.current) {
      return;
    }

    const allVideos = containerRef.current.querySelectorAll<HTMLVideoElement>(
      "video[data-review-index]",
    );

    allVideos.forEach((video) => {
      const videoIndex = Number(video.dataset.reviewIndex);

      if (Number.isNaN(videoIndex) || videoIndex === index) {
        return;
      }

      video.pause();
      video.currentTime = 0;
    });
  };

  const pauseVideosForIndex = (index: number, resetTime: boolean) => {
    getVideosForIndex(index).forEach((video) => {
      video.pause();

      if (resetTime) {
        video.currentTime = 0;
      }
    });
  };

  useEffect(() => {
    let isMounted = true;

    const loadVideos = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const reviewVideos: ReviewVideoItem[] = await getReviewVideos();

        if (!isMounted) {
          return;
        }

        setVideos(
          reviewVideos.map((video, index) => ({
            src: video.url,
            label: video.fileName || `Review ${index + 1}`,
          })),
        );
        setActiveIndex(0);
      } catch {
        if (isMounted) {
          setHasError(true);
          setVideos([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    pauseAndResetNonActiveVideos(activeIndex);
  }, [activeIndex, videos.length]);

  const selectVideo = (index: number) => {
    setPlayingIndex(null);
    setActiveIndex(index);
  };

  const playVideo = async (index: number) => {
    const video = getVisibleVideoForIndex(index);

    if (!video) {
      return;
    }

    pauseAndResetNonActiveVideos(index);

    getVideosForIndex(index).forEach((candidate) => {
      if (candidate !== video) {
        candidate.pause();
        candidate.currentTime = 0;
      }
    });

    setActiveIndex(index);

    try {
      await video.play();
      setPlayingIndex(index);
    } catch {
      setPlayingIndex(null);
    }
  };

  const toggleVideo = async (index: number) => {
    if (playingIndex === index) {
      pauseVideosForIndex(index, false);
      setPlayingIndex(null);
      return;
    }

    await playVideo(index);
  };

  const stopVideo = (index: number) => {
    pauseVideosForIndex(index, true);
    setPlayingIndex((current) => (current === index ? null : current));
  };

  const renderCard = (index: number, isActive: boolean) => {
    const video = videos[index];

    if (!video) {
      return null;
    }

    const isPlaying = playingIndex === index;

    return (
      <div
        key={video.src}
        className={`group relative h-92.5 overflow-hidden rounded-[28px] border border-black/5 bg-[#efe8dd] shadow-[0_16px_50px_rgba(17,24,39,0.12)] transition-all duration-300 md:h-105 lg:h-135 ${
          isActive
            ? "opacity-100 lg:flex-[1.25] lg:scale-[1.04]"
            : "opacity-80 lg:flex-[0.92] lg:scale-[0.97]"
        }`}>
        <button
          type='button'
          aria-label={
            isPlaying ? `Pause ${video.label}` : `Play ${video.label}`
          }
          onClick={() => toggleVideo(index)}
          className='absolute inset-0 z-10'
        />

        <video
          data-review-index={index}
          src={video.src}
          preload='metadata'
          playsInline
          muted={false}
          loop
          className='absolute inset-0 h-full w-full object-cover'
          onEnded={() => stopVideo(index)}
          onPause={() => {
            const stillPlayingSameIndex = getVideosForIndex(index).some(
              (item) => !item.paused && !item.ended,
            );

            if (!stillPlayingSameIndex && playingIndex === index) {
              setPlayingIndex(null);
            }
          }}
        />

        <div
          className={`absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent transition-opacity duration-300 ${
            isPlaying ? "opacity-20" : "opacity-100"
          }`}
        />

        <div className='absolute inset-0 z-20 flex items-center justify-center'>
          <button
            type='button'
            aria-label={
              isPlaying ? `Pause ${video.label}` : `Play ${video.label}`
            }
            onClick={(event) => {
              event.stopPropagation();
              toggleVideo(index);
            }}
            className='inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-white/90 text-[#5f9b7c] shadow-lg transition-transform duration-200 hover:scale-105'>
            {isPlaying ? (
              <Pause className='h-6 w-6 fill-current' />
            ) : (
              <Play className='ml-1 h-7 w-7 fill-current' />
            )}
          </button>
        </div>
      </div>
    );
  };

  const previousIndex =
    videos.length > 0 ? (activeIndex - 1 + videos.length) % videos.length : 0;
  const nextIndex = videos.length > 0 ? (activeIndex + 1) % videos.length : 0;

  return (
    <section className='py-12.5 my-13 md:my-20'>
      <div className='flex flex-col items-center justify-center text-center px-4 md:px-8 mb-10'>
        <Title
          title={"Real Stories from Homeowners"}
          subtitle={
            "Hear directly from clients who found their perfect property with us."
          }
          titleClass={
            "max-w-[550px] text-[35px] md:text-[48px] font-bold leading-tight"
          }
          subtitleClass={
            "text-lg md:text-[24px] mb-6 md:mb-7 max-w-[700px] mt-2 "
          }
        />
      </div>

      <div ref={containerRef} className='mx-auto w-full max-w-295 px-4 md:px-8'>
        {isLoading ? (
          <div className='rounded-[28px] border border-dashed border-[#cfe0d7] bg-white/70 px-6 py-14 text-center text-[#6b7d74] shadow-[0_16px_50px_rgba(17,24,39,0.06)]'>
            Loading review videos...
          </div>
        ) : hasError || videos.length === 0 ? (
          <div className='rounded-[28px] border border-dashed border-[#cfe0d7] bg-white/70 px-6 py-14 text-center text-[#6b7d74] shadow-[0_16px_50px_rgba(17,24,39,0.06)]'>
            No review videos found.
          </div>
        ) : (
          <>
            <div className='hidden items-stretch gap-6 lg:flex lg:gap-7'>
              {renderCard(previousIndex, false)}
              {renderCard(activeIndex, true)}
              {renderCard(nextIndex, false)}
            </div>

            <div className='lg:hidden'>{renderCard(activeIndex, true)}</div>

            <div className='mt-8 flex items-center justify-center gap-3'>
              {videos.map((video, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={video.src}
                    type='button'
                    aria-label={`Show ${video.label}`}
                    onClick={() => selectVideo(index)}
                    className={`h-3.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? "w-8 bg-[#5f9b7c]"
                        : "w-3.5 bg-[#cfe0d7] hover:bg-[#b8d1c3]"
                    }`}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
