import React, { useState }  from "react";
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import CodeVisualizer from "./CodeVisualizer";





function TestAutomatedApp() {
    const [userStory, setUserStory] = useState("");
    const [testScenarios, setTestScenarios]= useState("");
    const [proposedScenarios, setProposedScenarios] = useState([]);
    const [responseScenarios, setResponseScenarios] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingUnitTest, setLoadingUnitTest] = useState(false);
    const [choosenTestScenario, setChosenTestScenario] = useState('');
    const [code, setCode] = useState("");
    const [unitTest, setUnitTest] = useState("")
    const [responseUnitTest, setResponseUnitTest] = useState("");


    const [testScenariosSplitted, setTestScenariosSplitted] = useState([]);
    const chooseScenario = (event) => {
        setChosenTestScenario(event.target.value);
    };


    function splitTestScenarios(testScenarios) {
        const regex = /(\d+\.\s.*)/g;
        console.log(testScenarios);
        const found = testScenarios.match(regex);
        console.log(found);

        const testScenariosSplittedArray = found.map((scenarioText) => {
            const [scenarioNumber, description] = scenarioText.split(". ");

            return {
                name: scenarioNumber,
                description: description,
              };
        
    });
    setTestScenariosSplitted(testScenariosSplittedArray);
    console.log("proposedScenarios updated12:", testScenariosSplittedArray);
  }



      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch("http://localhost:3001/code/automatic-tests/user-story", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userStory,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const testScenarios = data.message;
            setTestScenarios(testScenarios);
            setLoading(false);
            setResponseScenarios(testScenarios);

            const testScenariosSplitted = splitTestScenarios(testScenarios);
            setProposedScenarios(testScenariosSplitted);
          });
      };



      const handleSubmitsecondary = (e) => {
        e.preventDefault();
        setLoadingUnitTest(true);
        fetch("http://localhost:3001/code/automatic-tests/unit-testing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            choosenTestScenario,
            userStory,
            code,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const myData = data.response;
            console.log(myData)
            setUnitTest(myData);
            setLoadingUnitTest(false);
            setResponseUnitTest(myData);
            ;
          });
      };
    
    


    return (
        <div className="App" >
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& .MuiTextField-root': { m: 1, width: '60%' }, // Make text fields full width
                }}
                noValidate
                autoComplete="off"
            >
                <Typography variant="h3" style={{ paddingTop: "20px" }}
                    gutterBottom>
                    Use the power of AI to draft automated Tests effortless! 🚀 🤖
                </Typography>
                <Typography variant="body1" style={{ paddingInline: "auto" }} gutterBottom>
                    First generate test Scenarios, then choose one of them and let AI draft an Automated Test for you
                </Typography>
                <TextField
                    id="user story"
                    label="User Story / Feature explanation"
                    value={userStory}
                    placeholder="Paste here your User Story or explain the purpose of the feature"
                    onChange={(e) => setUserStory(e.target.value)}
                    multiline
                    maxRows={20}
                />

                <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSubmit}
                    sx={{ marginBottom: '16px', marginTop: '16px' }}
                >
                    Draft some Scenarios
                </Button>

            </Box>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    <CircularProgress />
                </Box>
            )}

            

            {responseScenarios.length > 0 && (
                <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="paper-wrapper" style={{ width: "75%" }}>
                        <Typography variant="h5" gutterBottom
                        >
                            Potential Test Scenarios for your User Story : 
                        </Typography>
                        <Paper style={{ padding: '20px', whiteSpace: 'pre-wrap' }}>{responseScenarios}</Paper>
                       
                    </div>
                </div>
                <Divider style={{ margin: '16px 0' }}> <Typography variant="h6" component="div">
    Draft your Unit Test
  </Typography> </Divider>
                <Box  width="50%" display="block" margin="0 auto">
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose a Scenario</InputLabel>
                <Select
                    labelId="scenario"
                    id="scenario"
                    value={choosenTestScenario}
                    onChange={chooseScenario}
                >
                    {testScenariosSplitted.map((scenario, index) => (
                        <MenuItem key={index} value={scenario.description}>
                            {scenario.description}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Box>
            <Box mt={10} width="75%" margin="0 auto">
                    <textarea 
                        className="flex items-center justify-center code-input w-1/2 resize-y lg:block md:w-2/3 lg:w-full h-32 p-2 border rounded-md"
                        style={{ margin: '20px' }}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter your code here..."
                    />
                </Box>
                <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& .MuiTextField-root': { m: 1, width: '60%' }, // Make text fields full width
                }}
                noValidate
                autoComplete="off"
            >
                <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSubmitsecondary}
                    sx={{ marginBottom: '16px', marginTop: '16px' }}
                >
                    Create your Unit Test
                </Button>
                </Box>
                {loadingUnitTest && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    <CircularProgress />
                </Box>
            )}
                {responseUnitTest && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="paper-wrapper" style={{ width: "75%" }}>
                        <Typography variant="h5" gutterBottom
                        >
                            Here is your test for {choosenTestScenario}
                        </Typography>
                        <CodeVisualizer style={{ padding: '20px', whiteSpace: 'pre-wrap' }} code={responseUnitTest} />
                        
                       
                    </div>
                </div>
            )}
            </div>
                
            )}

        </div>
    );
}

export default TestAutomatedApp;