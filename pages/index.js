import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Box from "@mui/material/Box";

import Slider from "@mui/material/Slider";
export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [temperature, setTemperature] = useState(1);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Advanced ChatGPT</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
        <Box sx={{ width: 300 }}>
          <label>{`Temperature: ${temperature}`}</label>
          <Slider
            aria-label="Temperature"
            defaultValue={temperature}
            value={temperature}
            // valueLabelDisplay="auto"
            step={1}
            marks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            min={1}
            max={10}
            onChange={(_, value) => {
              setTemperature(value);
            }}
          />
        </Box>
      </main>
    </div>
  );
}
