const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function testUpload() {
  try {
    const formData = new FormData();
    // create a dummy file
    fs.writeFileSync('test.pdf', 'dummy content');
    formData.append('pdf', fs.createReadStream('test.pdf'));
    
    // We don't have a valid token, so we expect a 401 Unauthorized.
    // If we get 401, it means the server IS receiving the request.
    const res = await axios.post('http://localhost:5000/api/topics/upload-pdf', formData, {
      headers: formData.getHeaders()
    });
    console.log('Success:', res.status);
  } catch (error) {
    console.log('Error Status:', error.response ? error.response.status : error.message);
  }
}

testUpload();
