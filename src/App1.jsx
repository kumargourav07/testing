import React, { useState } from 'react';
import axios from 'axios';

const App1 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    skills: '',
    languages: '',
    certificates: '',
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = async () => {
      // Remove the "data:*/*;base64," prefix
      const base64Doc = reader.result.split(',')[1];

      const data = {
        extractionDetails: {
          name: 'Resume - Extraction',
          language: 'English',
          fields: [
            {
              key: 'personal_info',
              description: 'personal information of the person',
              type: 'object',
              properties: [
                { key: 'name', description: 'name of the person', type: 'string' },
                { key: 'email', description: 'email of the person', type: 'string' },
                { key: 'phone', description: 'phone of the person', type: 'string' },
                { key: 'address', description: 'address of the person', type: 'string' },
              ],
            },
            {
              key: 'skills',
              description: 'skills of the person',
              type: 'array',
              items: { type: 'string' },
            },
            {
              key: 'languages',
              description: 'languages spoken by the person',
              type: 'array',
              items: { type: 'string' },
            },
            {
              key: 'certificates',
              description: 'certificates of the person',
              type: 'array',
              items: { type: 'string' },
            },
          ],
        },
        file: base64Doc,
      };

      try {
        const response = await axios.post(
          'https://resume-parsing-api2.p.rapidapi.com/processDocument',
          data,
          {
            headers: {
              'x-rapidapi-key': '29a79843ddmshf1f7b2e3d0c9bdep142d55jsn1b1cf77be392',
              'x-rapidapi-host': 'resume-parsing-api2.p.rapidapi.com',
              'Content-Type': 'application/json',
            },
          }
        );

        const result = response.data;

        setFormData({
          name: result.personal_info?.name || '',
          email: result.personal_info?.email || '',
          phone: result.personal_info?.phone || '',
          address: result.personal_info?.address || '',
          skills: Array.isArray(result.skills) ? result.skills.join(', ') : '',
          languages: Array.isArray(result.languages) ? result.languages.join(', ') : '',
          certificates: Array.isArray(result.certificates) ? result.certificates.join(', ') : '',
        });

        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to parse resume. Please try again.');
      } finally {
        setUploading(false);
      }
    };

    reader.onerror = () => {
      setError('Failed to read the file.');
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Submitted Data:', formData);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Resume Autofill Forms</h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileUpload}
        disabled={uploading}
        className="mb-4"
      />

      {uploading && <p className="text-blue-600">Parsing resume...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2"
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-2"
        />
        <input
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Skills"
          className="w-full border p-2"
        />
        <input
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          placeholder="Languages"
          className="w-full border p-2"
        />
        <input
          name="certificates"
          value={formData.certificates}
          onChange={handleChange}
          placeholder="Certificates"
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={uploading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App1;
