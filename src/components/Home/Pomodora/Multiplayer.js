import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Multiplayer.css";

const useMultiAudio = urls => {
  const [sources] = useState(
    urls.map(url => {
      return {
        url,
        audio: new Audio(url)
      };
    })
  );

  const [players, setPlayers] = useState(
    urls.map(url => {
      return {
        url,
        playing: false
      };
    })
  );

  const toggle = targetIndex => () => {
    const newPlayers = [...players];
    const currentIndex = players.findIndex(p => p.playing === true);
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false;
      newPlayers[targetIndex].playing = true;
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false;
    } else {
      newPlayers[targetIndex].playing = true;
    }
    setPlayers(newPlayers);
  };

  useEffect(() => {
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause();
    });
  }, [sources, players]);

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener("ended", () => {
        const newPlayers = [...players];
        newPlayers[i].playing = false;
        setPlayers(newPlayers);
      });
    });
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener("ended", () => {
          const newPlayers = [...players];
          newPlayers[i].playing = false;
          setPlayers(newPlayers);
        });
      });
    };
  }, []);

  return [players, toggle];
};

const MultiPlayer = ({ urls }) => {
  const [players, toggle] = useMultiAudio(urls);

  return (
    <Row>
      {players.map((player, i) => (
        <Col lg={3} md={3} sm={3}>
        <Player key={i} player={player} toggle={toggle(i)} />
        </Col>
      ))}
    </Row>
  );
};

const Player = ({ player, toggle }) => (
  <button onClick={toggle} style={{display: "flex",
    justifyContent: "center",
    alignItems: "center"}}>
    {player.playing ? (
      <img src="https://cdn.glitch.com/30aa7dcb-47e2-4b82-951e-ef4686906d6c%2Fsuspended.png?v=1619279433005" />
    ) : (
      <img src="https://cdn.glitch.com/30aa7dcb-47e2-4b82-951e-ef4686906d6c%2Fplay-fill.png?v=1619279587416" />
    )}
  </button>
);

export default MultiPlayer;
