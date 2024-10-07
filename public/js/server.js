function validateForm() {
    const patientName = document.getElementById('patient-name').value;
    const chiefComplaint = document.getElementById('chief-complaint').value;

    if (!patientName || !chiefComplaint) {
      alert('Patient name and chief complaint are required!');
      return false; // Prevent form submission
    }
    return true; // Allow form submission
  }