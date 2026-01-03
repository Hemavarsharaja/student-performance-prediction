import React, { useState } from 'react';

function StudentForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    attendance: 80,
    internal_marks: 70,
    study_hours: 3,
    backlogs: 0,
    participation: 3,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="attendance">Attendance (%)</label>
        <input
          type="number"
          id="attendance"
          name="attendance"
          min="0"
          max="100"
          value={formData.attendance}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="internal_marks">Internal Marks (0-100)</label>
        <input
          type="number"
          id="internal_marks"
          name="internal_marks"
          min="0"
          max="100"
          value={formData.internal_marks}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="study_hours">Study Hours per Day</label>
        <input
          type="number"
          id="study_hours"
          name="study_hours"
          min="0"
          max="12"
          step="0.5"
          value={formData.study_hours}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="backlogs">Number of Backlogs</label>
        <input
          type="number"
          id="backlogs"
          name="backlogs"
          min="0"
          max="10"
          value={formData.backlogs}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="participation">Participation (1-5)</label>
        <input
          type="number"
          id="participation"
          name="participation"
          min="1"
          max="5"
          step="0.5"
          value={formData.participation}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={loading} className="btn-predict">
        {loading ? 'Predicting...' : 'Predict Performance'}
      </button>
    </form>
  );
}

export default StudentForm;
