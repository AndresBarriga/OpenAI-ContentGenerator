import React, { useState } from "react";
import "../App.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function CoverLetterApp() {
  const [purpose, setPurpose] = useState("");
  const [hypothesis, setHypothesis] = useState("");
  const [kpi, setKpi] = useState("");
  const [benefit, setBenefit] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const message = `
      Purpose: ${purpose}
      Hypothesis: ${hypothesis}
      kpi: ${kpi}
      Benefit: ${benefit}
    `;


    fetch("http://localhost:3001/coverLetterWriter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        const sections = data.message.split(/\b(?:A\/B Test Name:|Objective:|Duration:|Step [0-9]+:)\b/).filter(section => section.trim() !== "");
        setResponse(sections)
        setLoading(false);
      });

  };


  return (
    <div className="App">
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '50%' }, // Make text fields full width
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h2" gutterBottom>
          A/B Test Generator 🤖👨🏻‍💻
        </Typography>
        <Typography variant="body1" gutterBottom>
          Explore the power of AI to help you create an step by step A/B Test based on your needs
        </Typography>
        <TextField
          id="purpose"
          label="Purpose"
          value={purpose}
          placeholder="Purpose of the Test"
          onChange={(e) => setPurpose(e.target.value)}
          multiline
        />
        <TextField
          id="hypothesis"
          label="Hypothesis"
          value={hypothesis}
          placeholder="Hypothesis the test is based of"
          onChange={(e) => setHypothesis(e.target.value)}
          multiline
        />
        <TextField
          id="benefit"
          label="Benefit"
          value={benefit}
          placeholder="Benefit you are looking for"
          onChange={(e) => setBenefit(e.target.value)}
          multiline
        />
        <TextField
          id="kpi"
          label="KPI"
          value={kpi}
          placeholder="KPI to study"
          onChange={(e) => setKpi(e.target.value)}
          multiline
        />
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
          sx={{ marginBottom: '16px' }}
        >
          Generate Test 🚀
        </Button>
      </Box>

      {loading && (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
    <CircularProgress />
  </Box>
  )}


      {response.length > 0 && (
        <div style={{ alignItems: "center" }} >
          {response.map((section, index) => (
            <div key={index} className="paper-wrapper">
              <Paper className="paper-container" elevation={3}>
                {section.split('\n').map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </Paper>
            </div>
          ))}
        </div>
      )}
    </div>
  );

}

export default CoverLetterApp;