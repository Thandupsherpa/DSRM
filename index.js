const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname,'public')));

app.post('/Submit_Report', (req, res) => {
  const {
    'patient-name': patientName,
    'chief-complaint': chiefComplaint,
    'history-of-illness': historyOfIllness,
    'physical-examination': physicalExamination,
    diagnosis,
    'treatment-plan': treatmentPlan,
    medications,
    'follow-up-instructions': followUpInstructions
  } = req.body;

 
  if (!patientName || !chiefComplaint) {
    return res.status(400).send('Patient name and chief complaint are required.');
  }

  const reportData = {
    patientName,
    chiefComplaint,
    historyOfIllness,
    physicalExamination,
    diagnosis,
    treatmentPlan,
    medications,
    followUpInstructions,
    submittedAt: new Date()
  };

  const filePath = path.join(__dirname, 'report.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let reports = [];
    if (!err && data) {
      reports = JSON.parse(data);
    }
    
    reports.push(reportData);

    fs.writeFile(filePath, JSON.stringify(reports, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error writing report data to file');
      }
      res.send('Report submitted successfully');
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
