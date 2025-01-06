import React, { useState } from 'react';
import { createRental } from '../../services/rentalService';

const RentalForm = ({ carId, onRentalComplete }) => {
  const [dates, setDates] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const rentalData = {
        carId,
        startDate: new Date(dates.startDate).toISOString(),
        endDate: new Date(dates.endDate).toISOString()
      };

      await createRental(rentalData);
      onRentalComplete?.();
    } catch (err) {
      setError('Failed to create rental');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <input
          type="date"
          value={dates.startDate}
          onChange={(e) => setDates(prev => ({ ...prev, startDate: e.target.value }))}
          className="w-full border p-2 rounded"
          required
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">End Date</label>
        <input
          type="date"
          value={dates.endDate}
          onChange={(e) => setDates(prev => ({ ...prev, endDate: e.target.value }))}
          className="w-full border p-2 rounded"
          required
          min={dates.startDate}
        />
      </div>
      <button 
        type="submit"
        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Confirm Rental'}
      </button>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
};

export default RentalForm;