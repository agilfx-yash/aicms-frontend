import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useAuth } from "../../context/AuthContext";

// Simple Loader Component
const Loader = () => (
  <div className="flex items-center justify-center p-4">
    <div className="w-8 h-8 border-4 border-t-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Dashboard() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoText, setVideoText] = useState("");
  const [videoSummary, setVideoSummary] = useState("");
  const [articleUrl, setArticleUrl] = useState("");
  const [articleText, setArticleText] = useState("");
  const [articleSummary, setArticleSummary] = useState("");
  const { logout } = useAuth(); // Destructure logout from useAuth

  const [videoIsFetching, setVideoIsFetching] = useState(false);
  const [articleIsFetching, setArticleIsFetching] = useState(false);

  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleArticleUrlChange = (e) => {
    setArticleUrl(e.target.value);
  };

  const fetchVideoText = async () => {
    setVideoIsFetching(true);
    try {
      const encodedUrl = encodeURIComponent(videoUrl);
      const response = await fetch(
        `https://aicms-backend-bcf49b15774f.herokuapp.com/get-captions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ video_url: videoUrl }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setVideoText(data.description);
        setVideoSummary(""); // Clear summary if a new transcript is fetched
      } else {
        setVideoText(`Error: ${data.error}`);
      }
    } catch (error) {
      setVideoText(`Error: ${error.message}`);
    } finally {
      setVideoIsFetching(false);
    }
  };

  const summarizeVideoText = async () => {
    setVideoSummary("Loading..."); // Show loading state for summary
    try {
      const response = await fetch(
        "https://aicms-backend-bcf49b15774f.herokuapp.com/summarize_transcript",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcript: videoText }),
        }
      );
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        setVideoSummary(`Error: Unexpected response format.`);
        return;
      }

      if (response.ok) {
        setVideoSummary(data.summary);
      } else {
        setVideoSummary(`Error: ${data.error}`);
      }
    } catch (error) {
      setVideoSummary(`Error: ${error.message}`);
    }
  };

  const fetchArticleText = async () => {
    setArticleIsFetching(true);
    try {
      const encodedUrl = encodeURIComponent(articleUrl);
      const response = await fetch(
        `https://aicms-backend-bcf49b15774f.herokuapp.com/get_article_content?url=${encodedUrl}`
      );
      const data = await response.json();
      if (response.ok) {
        setArticleText(data.content);
        setArticleSummary(""); // Clear summary if a new article is fetched
      } else {
        setArticleText(`Error: ${data.error}`);
      }
    } catch (error) {
      setArticleText(`Error: ${error.message}`);
    } finally {
      setArticleIsFetching(false);
    }
  };

  const summarizeArticleText = async () => {
    setArticleSummary("Loading..."); // Show loading state for summary
    try {
      const response = await fetch(
        "https://aicms-backend.onrender.com/summarize_transcript",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcript: articleText }), // Assuming similar endpoint for articles
        }
      );
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        setArticleSummary(`Error: Unexpected response format.`);
        return;
      }

      if (response.ok) {
        setArticleSummary(data.summary);
      } else {
        setArticleSummary(`Error: ${data.error}`);
      }
    } catch (error) {
      setArticleSummary(`Error: ${error.message}`);
    }
  };
  const handleLogout = () => {
    logout(); // Call logout function to update state
    navigate("/"); // Redirect to login page
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a href="#" className="text-lg font-bold">
              Dashboard
            </a>
            {/* <a href="#" className="text-lg font-medium">
              Video
            </a>
            <a href="#" className="text-lg font-medium">
              Article
            </a> */}
          </div>
          <div className="flex items-center space-x-4">
            {/* <Button variant="ghost">Profile</Button>
            <Button variant="ghost">Settings</Button> */}
            <Button onClick={handleLogout} variant="ghost">
              Logout
            </Button>{" "}
          </div>
        </nav>
      </header>
      <main className="flex-1 grid grid-cols-2 gap-8 p-8">
        <div className="bg-background rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Video</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                type="text"
                value={videoUrl}
                onChange={handleVideoUrlChange}
                className="mt-1"
              />
            </div>
            <div className="flex space-x-4">
              <Button onClick={fetchVideoText} disabled={videoIsFetching}>
                Extract Text
              </Button>
              {videoText && !videoSummary && (
                <Button onClick={summarizeVideoText}>Get Summary</Button>
              )}
            </div>
            {videoIsFetching && <Loader />}
            {!videoIsFetching && videoText && !videoSummary && (
              <div className="bg-muted/20 rounded-lg p-4">
                <p>{videoText}</p>
              </div>
            )}
            {!videoIsFetching &&
              (videoSummary === "Loading..." ? (
                <Loader />
              ) : (
                videoSummary && (
                  <div className="bg-muted/20 rounded-lg p-4">
                    <h3 className="text-lg font-bold">Summary</h3>
                    <p>{videoSummary}</p>
                  </div>
                )
              ))}
          </div>
        </div>
        <div className="bg-background rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Article</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="articleUrl">Article URL</Label>
              <Input
                id="articleUrl"
                type="text"
                value={articleUrl}
                onChange={handleArticleUrlChange}
                className="mt-1"
              />
            </div>
            <div className="flex space-x-4">
              <Button onClick={fetchArticleText} disabled={articleIsFetching}>
                Extract Text
              </Button>
              {articleText && !articleSummary && (
                <Button onClick={summarizeArticleText}>Get Summary</Button>
              )}
            </div>
            {articleIsFetching && <Loader />}
            {!articleIsFetching && articleText && !articleSummary && (
              <div className="bg-muted/20 rounded-lg p-4">
                <p>{articleText}</p>
              </div>
            )}
            {!articleIsFetching &&
              (articleSummary === "Loading..." ? (
                <Loader />
              ) : (
                articleSummary && (
                  <div className="bg-muted/20 rounded-lg p-4">
                    <h3 className="text-lg font-bold">Summary</h3>
                    <p>{articleSummary}</p>
                  </div>
                )
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
