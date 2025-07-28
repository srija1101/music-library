import React, { useState } from 'react';
import './Library.css';

function Library({ role }) {
  const [songs, setSongs] = useState([
    { id: 1, title: 'Chahun main ya naa', artist: 'Arijit Singh', album: 'Aashiqui 2' }
    { id: 2, title: 'On My Way', artist: 'Alan Walker', album: 'Different World' },
    { id: 3, title: 'Perfect', artist: 'Ed Sheeran', album: 'Divide' },
    { id: 4, title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide' },
    { id: 5, title: ' Wildest Dreams', artist: 'Taylor Swift', album: '1989' },
    { id: 6, title: 'Its your love', artist: 'Naresh Iyer', album: 'Life is beautiful' },
  ]);

  const [filter, setFilter] = useState('');
  const [filterField, setFilterField] = useState('title');
  const [sortField, setSortField] = useState('title');
  const [groupBy, setGroupBy] = useState('');

  const [newSong, setNewSong] = useState({ title: '', artist: '', album: '' });

  const handleAddSong = () => {
    const id = songs.length ? songs[songs.length - 1].id + 1 : 1;
    setSongs([...songs, { id, ...newSong }]);
    setNewSong({ title: '', artist: '', album: '' });
  };

  const handleDelete = (id) => {
    setSongs(songs.filter(song => song.id !== id));
  };

  const filteredSongs = songs
    .filter(song => song[filterField].toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => a[sortField].localeCompare(b[sortField]));

  const groupedSongs = groupBy
    ? filteredSongs.reduce((groups, song) => {
        const key = song[groupBy];
        if (!groups[key]) groups[key] = [];
        groups[key].push(song);
        return groups;
      }, {})
    : { 'All Songs': filteredSongs };

  return (
    <div className="music-library">
      <h2>🎵 Music Library</h2>
      <p>Total Songs: {songs.length}</p>

      <input
        type="text"
        placeholder={`Search by ${filterField}...`}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
        <option value="">No Grouping</option>
        <option value="artist">Group by Artist</option>
        <option value="album">Group by Album</option>
      </select>
      <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
        <option value="">No Grouping</option>
        <option value="artist">Group by Artist</option>
        <option value="album">Group by Album</option>
      </select>
      <select value={filterField} onChange={(e) => setFilterField(e.target.value)}>
        <option value="title">Title</option>
        <option value="artist">Artist</option>
        <option value="album">Album</option>
      </select>
      <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
        <option value="title">Sort by Title</option>
        <option value="artist">Sort by Artist</option>
        <option value="album">Sort by Album</option>
      </select>
      <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
        <option value="">No Grouping</option>
        <option value="artist">Group by Artist</option>
        <option value="album">Group by Album</option>
      </select>
      <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
        <option value="">No Grouping</option>
        <option value="artist">Group by Artist</option>
        <option value="album">Group by Album</option>
      </select>

      {role === 'admin' && (
        <>
          <div style={{ marginTop: '20px' }}>
            <input
              type="text"
              placeholder="Title"
              value={newSong.title}
              onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Artist"
              value={newSong.artist}
              onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
            />
            <input
              type="text"
              placeholder="Album"
              value={newSong.album}
              onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
            />
            <button className="add-btn" onClick={handleAddSong}>➕ Add Song</button>
          </div>
        </>
      )}

      {Object.entries(groupedSongs).map(([group, songs]) => (
        <div key={group}>
          {group !== 'All Songs' && <h3 className="group-heading">{group.toUpperCase()}</h3>}
          {songs.map(song => (
            <div className="song-card" key={song.id}>
              <div className="song-details">
                <div className="title">{song.title}</div>
                <div className="artist">{song.artist} ({song.album})</div>
              </div>
              {role === 'admin' && (
                <button className="delete-btn" onClick={() => handleDelete(song.id)}>×</button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Library;
