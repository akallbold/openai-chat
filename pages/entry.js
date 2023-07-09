import { useState } from "react";
const sitePassword = process.env.SITE_PASSWORD;
export default function Entry() {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: sitePassword }),
      });

      if (response.status === 307) {
        // Redirect to the protected page
        window.location.href = "/";
      } else {
        const error = await response.text();
        alert(error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Password Protection</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
