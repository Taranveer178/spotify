import { useEffect, useMemo, useRef, useState } from "react";

const artists = [
  {
    id: "diljit-dosanjh",
    name: "Diljit Dosanjh",
    label: "The global superstar",
    genre: "Punjabi pop",
    listeners: "22.4M",
    photo: "photo-1500648767791-00dcc994a43e",
    color: "#b16b43",
    bio: "A voice that carries Punjabi music from the heart of Punjab to the biggest stages in the world.",
    tracks: [
      ["Lover", "MoonChild Era", "3:07"],
      ["Born to Shine", "G.O.A.T.", "3:34"],
      ["Hass Has", "Hass Hass", "2:33"],
      ["Naina", "Crew", "3:00"],
    ],
  },
  {
    id: "karan-aujla",
    name: "Karan Aujla",
    label: "Geetan Di Machine",
    genre: "Punjabi hip-hop",
    listeners: "18.1M",
    photo: "photo-1506794778202-cad84cf45f1d",
    color: "#c27b4b",
    bio: "A distinctive songwriter and performer shaping the sound of modern Punjabi pop and hip-hop.",
    tracks: [
      ["Softly", "Making Memories", "2:38"],
      ["Winning Speech", "Four You", "3:20"],
      ["Admirin' You", "Making Memories", "3:05"],
      ["On Top", "Four You", "2:58"],
    ],
  },
  {
    id: "sidhu-moose-wala",
    name: "Sidhu Moose Wala",
    label: "A voice that lives on",
    genre: "Punjabi hip-hop",
    listeners: "16.8M",
    photo: "photo-1507003211169-0a1dd7228f2d",
    color: "#7e7256",
    bio: "A boundary-pushing artist remembered for his unmistakable voice, fearless writing, and lasting influence.",
    tracks: [
      ["295", "Moosetape", "4:30"],
      ["The Last Ride", "No Name", "4:07"],
      ["So High", "PBX 1", "3:30"],
      ["Legend", "PBX 1", "4:02"],
    ],
  },
  {
    id: "ap-dhillon",
    name: "AP Dhillon",
    label: "Sound of a new wave",
    genre: "Punjabi pop",
    listeners: "14.2M",
    photo: "photo-1535713875002-d1d0cf377fde",
    color: "#56787c",
    bio: "Blending Punjabi roots with sleek, genre-crossing production and a sound all his own.",
    tracks: [
      ["With You", "With You", "2:34"],
      ["Excuses", "Hidden Gems", "2:56"],
      ["Brown Munde", "Not by Chance", "4:04"],
      ["Summer High", "Two Hearts Never Break the Same", "2:57"],
    ],
  },
  {
    id: "arijit-singh",
    name: "Arijit Singh",
    label: "The voice of a generation",
    genre: "Hindi",
    listeners: "28.7M",
    photo: "photo-1506794778202-cad84cf45f1d",
    color: "#937260",
    bio: "One of India's most loved playback singers, known for soulful melodies that stay with you.",
    tracks: [
      ["Kesariya", "Brahmastra", "4:28"],
      ["Tum Hi Ho", "Aashiqui 2", "4:22"],
      ["Chaleya", "Jawan", "3:20"],
      ["Heeriye", "Heeriye", "3:14"],
    ],
  },
  {
    id: "shubh",
    name: "Shubh",
    label: "Independent by nature",
    genre: "Punjabi hip-hop",
    listeners: "12.3M",
    photo: "photo-1534528741775-53994a69daeb",
    color: "#60786d",
    bio: "A fresh voice bringing melodic hooks and a modern edge to Punjabi music.",
    tracks: [
      ["Still Rollin", "Still Rollin", "2:55"],
      ["Cheques", "Still Rollin", "3:04"],
      ["Elevated", "Still Rollin", "3:18"],
      ["One Love", "One Love", "2:39"],
    ],
  },
  {
    id: "amrinder-gill",
    name: "Amrinder Gill",
    label: "A Punjabi original",
    genre: "Punjabi folk",
    listeners: "6.8M",
    photo: "photo-1507003211169-0a1dd7228f2d",
    color: "#8e775a",
    bio: "A beloved singer and storyteller whose warm voice is woven into Punjabi culture.",
    tracks: [
      ["Judaa", "Judaa 3", "4:05"],
      ["Dildarian", "Judaa 2", "4:12"],
      ["Pendu", "Angrej", "3:43"],
      ["Mera Deewanapan", "Judaa 2", "4:25"],
    ],
  },
  {
    id: "sunidhi-chauhan",
    name: "Sunidhi Chauhan",
    label: "Unstoppable energy",
    genre: "Hindi",
    listeners: "9.4M",
    photo: "photo-1531123897727-8f129e1688ce",
    color: "#a65e53",
    bio: "A powerhouse performer whose dynamic voice has lit up Indian music for decades.",
    tracks: [
      ["Sheila Ki Jawani", "Tees Maar Khan", "4:42"],
      ["Aaja Nachle", "Aaja Nachle", "5:05"],
      ["Kamli", "Dhoom 3", "3:55"],
      ["Crazy Kiya Re", "Dhoom 2", "4:55"],
    ],
  },
];

const categories = ["All sounds", "Punjabi pop", "Punjabi hip-hop", "Punjabi folk", "Hindi"];

function Icon({ name, size = 20 }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
    music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
    heart: <path d="M20.8 8.8c0 5.4-8.8 11-8.8 11s-8.8-5.6-8.8-11a4.8 4.8 0 0 1 8.8-2.7 4.8 4.8 0 0 1 8.8 2.7Z" />,
    play: <path d="m8 5 12 7-12 7V5Z" />,
    pause: <><path d="M8 5h3v14H8z" /><path d="M15 5h3v14h-3z" /></>,
    back: <><path d="m15 18-6-6 6-6" /><path d="M20 12H9" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    shuffle: <><path d="m18 14 4 4-4 4" /><path d="m18 2 4 4-4 4" /><path d="M2 18h2.5a6 6 0 0 0 4.24-1.76L18 7" /><path d="M2 6h2.5a6 6 0 0 1 4.24 1.76" /><path d="M14 18h2" /></>,
  };
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function ArtistImage({ artist, className = "" }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`artist-image ${className}`} style={{ "--artist-color": artist.color }}>
      {!failed ? (
        <img
          src={`https://images.unsplash.com/${artist.photo}?auto=format&fit=crop&w=720&q=85`}
          alt={`${artist.name} portrait`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : <span aria-hidden="true">{artist.name.split(" ").map((part) => part[0]).join("")}</span>}
    </div>
  );
}

function ArtistCard({ artist, onOpen, compact = false }) {
  return (
    <button className={`artist-card ${compact ? "artist-card-compact" : ""}`} onClick={() => onOpen(artist)}>
      <ArtistImage artist={artist} />
      <span className="artist-card-copy">
        <span className="artist-name">{artist.name}</span>
        <span className="artist-label">{artist.label}</span>
      </span>
      <span className="card-play" aria-hidden="true"><Icon name="play" size={18} /></span>
    </button>
  );
}

function TrackRow({ track, artist, index, active, isPlaying, liked, onPlay, onLike }) {
  return (
    <div className={`track-row ${active ? "track-row-active" : ""}`}>
      <button className="track-index" aria-label={`${active && isPlaying ? "Pause" : "Play"} ${track[0]}`} onClick={onPlay}>
        {active && isPlaying ? <Icon name="pause" size={17} /> : <><span className="track-number">{String(index + 1).padStart(2, "0")}</span><span className="track-play"><Icon name="play" size={17} /></span></>}
      </button>
      <div className="track-title-wrap">
        <span className="track-title">{track[0]}</span>
        <span className="track-artist">{artist.name}</span>
      </div>
      <span className="track-album">{track[1]}</span>
      <button className={`like-button ${liked ? "is-liked" : ""}`} aria-label={liked ? "Remove from liked songs" : "Add to liked songs"} onClick={onLike}>
        <Icon name="heart" size={17} />
      </button>
      <span className="track-duration">{track[2]}</span>
    </div>
  );
}

function App() {
  const [location, setLocation] = useState(window.location.hash || "#/");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All sounds");
  const [view, setView] = useState("home");
  const [liked, setLiked] = useState([]);
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playbackMessage, setPlaybackMessage] = useState("");
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(30);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef(null);
  const playbackRequest = useRef(0);

  useEffect(() => {
    const syncLocation = () => setLocation(window.location.hash || "#/");
    window.addEventListener("hashchange", syncLocation);
    return () => window.removeEventListener("hashchange", syncLocation);
  }, []);

  useEffect(() => () => {
    playbackRequest.current += 1;
    audioRef.current?.pause();
  }, []);

  const artistId = location.startsWith("#/artist/") ? location.slice("#/artist/".length) : null;
  const selectedArtist = artists.find((artist) => artist.id === artistId);
  const filteredArtists = useMemo(() => artists.filter((artist) => {
    const matchesQuery = `${artist.name} ${artist.genre} ${artist.label}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesCategory = category === "All sounds" || artist.genre === category;
    return matchesQuery && matchesCategory;
  }), [category, query]);

  const openArtist = (artist) => {
    window.location.hash = `/artist/${artist.id}`;
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleLike = (track, artist) => {
    const id = `${artist.id}:${track[0]}`;
    setLiked((saved) => saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]);
  };
  const playTrack = async (track, artist) => {
    const id = `${artist.id}:${track[0]}`;
    if (current?.id === id) {
      if (isLoading) return;
      if (audioRef.current?.paused) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setPlaybackMessage("");
        } catch (error) {
          setIsPlaying(false);
          setPlaybackMessage("This browser can't play the preview format.");
        }
      } else if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        setPlaybackMessage("Preview paused.");
      }
      return;
    }
    const requestId = ++playbackRequest.current;
    audioRef.current?.pause();
    audioRef.current = null;
    setCurrent({ id, title: track[0], artist: artist.name, photo: artist.photo, color: artist.color });
    setIsPlaying(false);
    setIsLoading(true);
    setPlaybackMessage("");
    setPosition(0);
    setDuration(30);

    try {
      const params = new URLSearchParams({
        term: `${artist.name} ${track[0]}`,
        entity: "song",
        limit: "10",
        country: "IN",
      });
      const response = await fetch(`https://itunes.apple.com/search?${params}`);
      if (!response.ok) throw new Error("The music preview service is unavailable.");
      const { results = [] } = await response.json();
      const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
      const expectedTitle = normalize(track[0]);
      const result = results.find((item) =>
        item.previewUrl
        && normalize(item.trackName || "") === expectedTitle
        && normalize(item.artistName || "").includes(normalize(artist.name.split(" ")[0])),
      );
      if (!result) throw new Error("No 30-second preview is available for this track.");
      if (requestId !== playbackRequest.current) return;

      const audio = new Audio(result.previewUrl);
      audioRef.current = audio;
      audio.ontimeupdate = () => {
        setPosition(audio.currentTime);
        if (Number.isFinite(audio.duration)) setDuration(audio.duration);
      };
      audio.onended = () => {
        setIsPlaying(false);
        setPlaybackMessage("Preview finished.");
      };
      audio.onerror = () => {
        setIsPlaying(false);
        setPlaybackMessage("The preview couldn't be played in this browser.");
      };
      await audio.play();
      if (requestId === playbackRequest.current) setIsPlaying(true);
    } catch (error) {
      if (requestId === playbackRequest.current) {
        const message = error instanceof Error ? error.message : "";
        setPlaybackMessage(message.includes("supported source") || message.includes("supported")
          ? "This browser can't play the preview format."
          : message || "The preview could not be loaded.");
      }
    } finally {
      if (requestId === playbackRequest.current) setIsLoading(false);
    }
  };
  const playNextTrack = () => {
    if (!current) return;
    const artist = artists.find((item) => item.name === current.artist);
    if (!artist) return;
    const currentIndex = artist.tracks.findIndex((track) => track[0] === current.title);
    const nextIndex = isShuffle
      ? (currentIndex + 1 + Math.floor(Math.random() * (artist.tracks.length - 1))) % artist.tracks.length
      : (currentIndex + 1) % artist.tracks.length;
    playTrack(artist.tracks[nextIndex], artist);
  };
  const navTo = (nextView) => {
    setView(nextView);
    if (location !== "#/") window.location.hash = "/";
  };

  const allTracks = artists.flatMap((artist) => artist.tracks.map((track) => ({ track, artist })));
  const likedTracks = allTracks.filter(({ track, artist }) => liked.includes(`${artist.id}:${track[0]}`));
  const featuredArtist = artists[0];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#/" onClick={() => setView("home")} aria-label="Raagify home">
          <span className="brand-mark"><span /><span /><span /><span /></span>
          <span className="brand-name">raagify<span className="brand-period">.</span></span>
        </a>
        <p className="sidebar-caption">YOUR SPACE</p>
        <nav className="side-nav" aria-label="Main navigation">
          <button className={view === "home" ? "nav-link nav-link-active" : "nav-link"} onClick={() => navTo("home")}><Icon name="home" /><span>Discover</span></button>
          <button className={view === "artists" ? "nav-link nav-link-active" : "nav-link"} onClick={() => navTo("artists")}><Icon name="music" /><span>Artists</span></button>
          <button className={view === "liked" ? "nav-link nav-link-active" : "nav-link"} onClick={() => navTo("liked")}><Icon name="heart" /><span>Your favourites</span><span className="nav-count">{liked.length || ""}</span></button>
        </nav>

        <div className="sidebar-note">
          <span className="note-kicker">A little more you</span>
          <p>Find the voices you love, and a few you haven't met yet.</p>
          <button onClick={() => navTo("artists")}>Explore artists <Icon name="arrow" size={15} /></button>
        </div>

        <div className="sidebar-bottom">
          <span className="status-dot" />
          <span>Made for your kind of music</span>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-left">
            {selectedArtist ? (
              <button className="back-button" onClick={() => { window.location.hash = "/"; }}><Icon name="back" size={18} /> <span>Back</span></button>
            ) : <span className="topbar-greeting">Good music. Good mood.</span>}
          </div>
          <label className="search-field">
            <Icon name="search" size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search artists or sounds" aria-label="Search artists or sounds" />
            {query && <button className="clear-search" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
          </label>
          <div className="user-chip"><span className="user-avatar">R</span><span>Listener</span></div>
        </header>

        <div className="page-scroll">
          {selectedArtist ? (
            <ArtistPage
              artist={selectedArtist}
              liked={liked}
              current={current}
              isPlaying={isPlaying}
              onPlay={playTrack}
              onLike={toggleLike}
            />
          ) : view === "liked" ? (
            <section className="content-section library-page">
              <p className="eyebrow">YOUR COLLECTION</p>
              <h1>Your favourites<span className="lime-period">.</span></h1>
              <p className="section-intro">The songs you want to come back to.</p>
              {likedTracks.length ? (
                <TrackList tracks={likedTracks} liked={liked} current={current} isPlaying={isPlaying} onPlay={playTrack} onLike={toggleLike} />
              ) : (
                <div className="empty-state"><span className="empty-heart"><Icon name="heart" size={25} /></span><h2>A space for your favourites</h2><p>Tap the heart beside a song to save it here.</p><button className="text-button" onClick={() => navTo("home")}>Find something you love <Icon name="arrow" size={16} /></button></div>
              )}
            </section>
          ) : (
            <>
              {view === "home" && !query && <Hero artist={featuredArtist} onOpen={openArtist} />}
              <section className="content-section artists-section" id="artists">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">{view === "artists" || query ? "FIND YOUR NEXT FAVOURITE" : "A FEW FAMILIAR VOICES"}</p>
                    <h2>{query ? "Search results" : view === "artists" ? "Meet the artists" : "Artists to know"}<span className="lime-period">.</span></h2>
                  </div>
                  <span className="section-count">{filteredArtists.length} artists</span>
                </div>
                <div className="category-list" aria-label="Filter by genre">
                  {categories.map((item) => (
                    <button key={item} className={category === item ? "category-chip category-chip-active" : "category-chip"} onClick={() => setCategory(item)}>{item}</button>
                  ))}
                </div>
                {filteredArtists.length ? (
                  <div className="artist-grid">
                    {filteredArtists.map((artist) => <ArtistCard key={artist.id} artist={artist} onOpen={openArtist} />)}
                  </div>
                ) : <div className="no-results"><Icon name="search" size={23} /><p>No artists found. Try another name or genre.</p></div>}
              </section>
              {view === "home" && !query && <ListenNote onClick={() => navTo("artists")} />}
            </>
          )}
        </div>
      </main>

      <Player
        current={current}
        isPlaying={isPlaying}
        isLoading={isLoading}
        playbackMessage={playbackMessage}
        position={position}
        duration={duration}
        onToggle={() => {
          if (!current) return;
          const artist = artists.find((item) => item.name === current.artist);
          const track = artist?.tracks.find((item) => item[0] === current.title);
          if (artist && track) playTrack(track, artist);
        }}
        liked={liked}
        isShuffle={isShuffle}
        onShuffle={() => setIsShuffle((value) => !value)}
        onNext={playNextTrack}
        onLike={() => {
          if (!current) return;
          const artist = artists.find((item) => item.name === current.artist);
          if (artist) toggleLike([current.title], artist);
        }}
      />
    </div>
  );
}

function Hero({ artist, onOpen }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow"><span className="hero-dot" /> THE SOUND OF RIGHT NOW</p>
        <h1>Rooted in rhythm.<br /><span>Made to move you.</span></h1>
        <p className="hero-description">From Punjabi pop to late-night Hindi melodies, find the music that feels like yours.</p>
        <button className="hero-button" onClick={() => onOpen(artist)}>Meet {artist.name} <Icon name="arrow" size={17} /></button>
      </div>
      <button className="hero-portrait" onClick={() => onOpen(artist)} aria-label={`View ${artist.name}'s artist page`}>
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <ArtistImage artist={artist} />
        <span className="hero-sticker">ON REPEAT <span>✳</span></span>
        <span className="hero-image-caption"><span className="hero-caption-kicker">ARTIST SPOTLIGHT</span><strong>{artist.name}</strong><span>{artist.genre} · {artist.listeners} monthly listeners</span></span>
      </button>
      <div className="hero-index"><span>01</span><i /> 03</div>
    </section>
  );
}

function ArtistPage({ artist, liked, current, isPlaying, onPlay, onLike }) {
  const tracks = artist.tracks.map((track) => ({ track, artist }));
  const activeTrack = current && current.artist === artist.name ? current : null;
  return (
    <section className="artist-page">
      <div className="artist-profile" style={{ "--artist-color": artist.color }}>
        <div className="profile-glow" />
        <ArtistImage artist={artist} className="profile-photo" />
        <div className="profile-copy">
          <p className="eyebrow"><span className="verified-mark">✓</span> ARTIST PROFILE</p>
          <h1>{artist.name}</h1>
          <p className="profile-bio">{artist.bio}</p>
          <div className="profile-meta"><span>{artist.genre}</span><i /> <span>{artist.listeners} monthly listeners</span></div>
          <button className="profile-play" onClick={() => onPlay(artist.tracks[0], artist)}><Icon name={activeTrack && isPlaying ? "pause" : "play"} size={17} /> {activeTrack && isPlaying ? "Pause" : "Play artist"}</button>
        </div>
        <span className="profile-number">RAAGIFY / ARTIST</span>
      </div>
      <div className="content-section artist-content">
        <div className="section-heading">
          <div><p className="eyebrow">THE ESSENTIALS</p><h2>Popular tracks<span className="lime-period">.</span></h2></div>
          <span className="section-count">A good place to start</span>
        </div>
        <TrackList tracks={tracks} liked={liked} current={current} isPlaying={isPlaying} onPlay={onPlay} onLike={onLike} />
        <div className="artist-about">
          <ArtistImage artist={artist} />
          <div><p className="eyebrow">GET TO KNOW THEM</p><h3>{artist.label}</h3><p>{artist.bio}</p></div>
        </div>
      </div>
    </section>
  );
}

function TrackList({ tracks, liked, current, isPlaying, onPlay, onLike }) {
  return (
    <div className="track-list">
      <div className="track-list-header"><span>#</span><span>TITLE</span><span>ALBUM</span><span /><span>TIME</span></div>
      {tracks.map(({ track, artist }, index) => {
        const id = `${artist.id}:${track[0]}`;
        return <TrackRow key={id} track={track} artist={artist} index={index} active={current?.id === id} isPlaying={isPlaying} liked={liked.includes(id)} onPlay={() => onPlay(track, artist)} onLike={() => onLike(track, artist)} />;
      })}
    </div>
  );
}

function ListenNote({ onClick }) {
  return (
    <section className="listen-note">
      <span className="listen-note-mark">✳</span>
      <div><p className="eyebrow">YOUR NEXT DISCOVERY</p><h3>Every great playlist starts with a voice.</h3></div>
      <button className="text-button" onClick={onClick}>Explore the artists <Icon name="arrow" size={16} /></button>
    </section>
  );
}

function Player({ current, isPlaying, isLoading, playbackMessage, position, duration, isShuffle, onShuffle, onNext, onToggle, liked, onLike }) {
  const currentArtist = artists.find((artist) => artist.name === current?.artist);
  const isLiked = currentArtist && liked.includes(`${currentArtist.id}:${current?.title}`);
  return (
    <footer className="player-bar">
      <div className="now-playing">
        {current ? <ArtistImage artist={currentArtist} className="player-art" /> : <div className="player-art player-art-empty"><Icon name="music" size={19} /></div>}
        <div className="now-playing-copy">
          <span className="now-playing-title">{current?.title || "Your next favourite"}</span>
          <span className="now-playing-artist">{current?.artist || "Pick an artist and press play"}</span>
          {(playbackMessage || isLoading) && <span className="now-playing-state">{isLoading ? "Loading preview…" : playbackMessage}</span>}
        </div>
        {current && <button className={`like-button player-like ${isLiked ? "is-liked" : ""}`} aria-label={isLiked ? "Remove from liked songs" : "Add to liked songs"} onClick={onLike}><Icon name="heart" size={17} /></button>}
      </div>
      <div className="player-controls">
        <div className="control-buttons">
          <button className={`subtle-control ${isShuffle ? "shuffle-active" : ""}`} onClick={onShuffle} aria-label={isShuffle ? "Turn shuffle off" : "Turn shuffle on"}><Icon name="shuffle" size={17} /></button>
          <button className="main-play" onClick={onToggle} aria-label={isPlaying ? "Pause" : "Play"}><Icon name={isPlaying ? "pause" : "play"} size={17} /></button>
          <button className="subtle-control" onClick={onNext} aria-label="Next song"><Icon name="arrow" size={17} /></button>
        </div>
        <div className="progress-row">
          <span>{playbackMessage || (isLoading ? "LOADING PREVIEW" : isPlaying ? "30 SEC PREVIEW" : current ? "PREVIEW PAUSED" : "READY WHEN YOU ARE")}</span>
          <div className="progress-track"><i style={{ width: `${duration ? Math.min((position / duration) * 100, 100) : 0}%` }} /></div>
          <span>{current ? `${Math.floor(position / 60)}:${String(Math.floor(position % 60)).padStart(2, "0")}` : "—:——"}</span>
        </div>
      </div>
      <div className="player-side"><span className="player-quality"><span /> 30-SECOND PREVIEW</span></div>
    </footer>
  );
}

export default App;
