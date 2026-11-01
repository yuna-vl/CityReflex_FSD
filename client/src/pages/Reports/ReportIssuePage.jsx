import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import { useReports } from '../../hooks/useReports';
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  Info,
  ShieldCheck,
  LayoutDashboard,
  Search
} from 'lucide-react';
import { CIVIC_CATEGORIES } from '../../data/mockReports';

export const ReportIssuePage = () => {
  const navigate = useNavigate();
  const { submitReport, currentUser } = useReports();

  // Form State
  const [formData, setFormData] = useState({
    category: 'roads',
    subcategory: 'Pothole Repair',
    title: '',
    description: '',
    ward: 'Ward 14 (South Zone)',
    landmark: '',
    severity: 'Medium',
    citizenName: currentUser.name,
    citizenPhone: '9876544821'
  });

  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const subcategories = {
    roads: ['Pothole Repair', 'Damaged Footpath Slab', 'Road Resurfacing Needed', 'Missing Manhole Cover'],
    sanitation: ['Garbage Dump Clearance', 'Secondary Bin Overflow', 'Dead Animal Removal', 'Debris Dumping'],
    lighting: ['Streetlight Outage', 'Flickering Lamp', 'Damaged Electric Pole', 'Exposed High-Voltage Cable'],
    drainage: ['Storm Drain Blockage', 'Water Logging', 'Sewage Overflow', 'Broken Culvert'],
    accessibility: ['Missing Wheelchair Ramp', 'Broken Tactile Paving', 'High Curb Obstruction', 'Blocked Ramp Access'],
    public_safety: ['Dark Unlit Corridor', 'Missing Footpath Link', 'Unsafe Blind Corner', 'Vegetation Obstruction']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'category' ? { subcategory: subcategories[value]?.[0] || '' } : {})
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Commit to the shared frontend state layer
    setTimeout(() => {
      const result = submitReport({
        category: formData.category,
        subcategory: formData.subcategory,
        title: formData.title,
        description: formData.description,
        ward: formData.ward,
        landmark: formData.landmark,
        severity: formData.severity,
        citizenName: formData.citizenName,
        citizenPhone: formData.citizenPhone,
        photoUrl: photoPreview
      });

      setSubmittedTicket(result.ticket);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Citizen Services', to: '/services' }, { label: 'Report an Issue' }]} />

      <div className="portal-container" style={{ paddingTop: '2rem' }}>
        {/* State Sync Notice */}
        <Alert type="info" title="Shared Frontend State Integration Active">
          Submissions automatically synchronize across your <strong>Citizen Dashboard</strong>, <strong>Complaint History</strong>, and the <strong>Tracking Engine</strong>, enabling immediate end-to-end verification.
        </Alert>

        {submittedTicket ? (
          /* Confirmation Success Card */
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid var(--color-success-green)',
              padding: '2rem',
              borderRadius: '2px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-card)',
              maxWidth: '720px',
              margin: '2rem auto'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: 'var(--color-success-bg)',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-success-green)',
                marginBottom: '1rem'
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', marginBottom: '0.5rem' }}>
              Grievance Successfully Registered
            </h2>

            <div
              style={{
                backgroundColor: '#F1F5F9',
                border: '1px dashed var(--color-border-dark)',
                padding: '1.25rem',
                borderRadius: '2px',
                margin: '1rem 0'
              }}
            >
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Your Generated Official Ticket Number:
              </div>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--color-gov-blue)',
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                  marginTop: '0.25rem'
                }}
              >
                {submittedTicket.ticketNumber}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '0.35rem' }}>
                Subject: <strong>{submittedTicket.subject}</strong> ({submittedTicket.category})
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Your complaint has been queued in your <strong>Citizen Dashboard</strong> and forwarded to <strong>{submittedTicket.assignedAuthority.name}</strong> ({submittedTicket.assignedAuthority.department}). Statutory resolution target: <strong>{submittedTicket.expectedResolutionDate}</strong>.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="primary"
                size="md"
                icon={Search}
                onClick={() => navigate(`/track?ticket=${submittedTicket.ticketNumber}`)}
              >
                Track Live Status
              </Button>

              <Button
                variant="gold"
                size="md"
                icon={LayoutDashboard}
                onClick={() => navigate('/dashboard')}
              >
                View in My Dashboard
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setSubmittedTicket(null);
                  setPhotoPreview(null);
                  setFormData((prev) => ({ ...prev, title: '', description: '', landmark: '' }));
                }}
              >
                File Another Grievance
              </Button>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr)',
              gap: '2rem'
            }}
            className="reporting-grid"
          >
            {/* Left: Grievance Filing Form */}
            <Card>
              <Card.Header variant="navy">
                <Card.Title icon={AlertCircle}>Citizen Grievance Lodging Form</Card.Title>
              </Card.Header>
              <Card.Body>
                <form onSubmit={handleSubmit}>
                  {/* Category Selection */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="cat-select">
                      Civic Service Category <span className="required">*</span>
                    </label>
                    <select
                      id="cat-select"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    >
                      {CIVIC_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="subcat-select">
                      Problem Specific Sub-type <span className="required">*</span>
                    </label>
                    <select
                      id="subcat-select"
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    >
                      {(subcategories[formData.category] || []).map((sub, idx) => (
                        <option key={idx} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Grievance Title */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="title-input">
                      Brief Summary / Title <span className="required">*</span>
                    </label>
                    <input
                      id="title-input"
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. Hazardous deep pothole opposite State Bank ATM on M.G. Road"
                      required
                    />
                  </div>

                  {/* Ward and Zone Selection */}
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="ward-select">
                        Municipal Ward <span className="required">*</span>
                      </label>
                      <select
                        id="ward-select"
                        name="ward"
                        value={formData.ward}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      >
                        <option value="Ward 03 (Central Zone)">Ward 03 (Central Zone)</option>
                        <option value="Ward 08 (Central Zone)">Ward 08 (Central Zone)</option>
                        <option value="Ward 11 (West Zone)">Ward 11 (West Zone)</option>
                        <option value="Ward 14 (South Zone)">Ward 14 (South Zone)</option>
                        <option value="Ward 22 (North Zone)">Ward 22 (North Zone)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="landmark-input">
                        Prominent Landmark <span className="required">*</span>
                      </label>
                      <input
                        id="landmark-input"
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="e.g. Near Bus Stop #4, Opposite Post Office"
                        required
                      />
                    </div>
                  </div>

                  {/* Photo Evidence Upload */}
                  <div className="form-group">
                    <label className="form-label">
                      Photographic Evidence (Geotagged Photo Upload)
                    </label>
                    <div
                      style={{
                        border: '2px dashed var(--color-border)',
                        padding: '1.25rem',
                        textAlign: 'center',
                        backgroundColor: '#FAFBFD',
                        borderRadius: '2px'
                      }}
                    >
                      <input
                        type="file"
                        id="photo-upload"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        style={{ display: 'none' }}
                      />
                      <label
                        htmlFor="photo-upload"
                        style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <Camera size={28} color="var(--color-gov-blue)" />
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-gov-blue)' }}>
                          Click to select photo or drag image here
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          Supports JPG, PNG up to 5MB (Saved to State Layer)
                        </span>
                      </label>

                      {photoPreview && (
                        <div style={{ marginTop: '1rem' }}>
                          <img
                            src={photoPreview}
                            alt="Selected evidence preview"
                            style={{ maxHeight: '140px', borderRadius: '2px', border: '1px solid var(--color-border)' }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="desc-input">
                      Detailed Problem Description <span className="required">*</span>
                    </label>
                    <textarea
                      id="desc-input"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Please specify size of pothole, duration of problem, risk to pedestrians or traffic, and any previous complaint numbers..."
                      required
                    />
                  </div>

                  {/* Severity Tier */}
                  <div className="form-group">
                    <label className="form-label">Grievance Urgency Tier</label>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {['Low (Routine)', 'Medium (Standard)', 'High (Traffic/Pedestrian Hazard)', 'Critical (Emergency)'].map((tier) => (
                        <label key={tier} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8125rem', cursor: 'pointer' }}>
                          <input
                            type="radio"
                            name="severity"
                            value={tier.split(' ')[0]}
                            checked={formData.severity === tier.split(' ')[0]}
                            onChange={handleInputChange}
                          />
                          <span>{tier}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                      icon={isSubmitting ? null : AlertCircle}
                    >
                      {isSubmitting ? 'Registering Ticket...' : 'Register Official Grievance'}
                    </Button>
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => {
                        setFormData({
                          category: 'roads',
                          subcategory: 'Pothole Repair',
                          title: 'Hazardous deep crater pothole near junction causing traffic skid',
                          description: '1.5 meter wide crater formed during recent monsoon showers. Multiple two-wheelers observed losing balance.',
                          ward: 'Ward 14 (South Zone)',
                          landmark: 'Opposite State Bank ATM',
                          severity: 'High',
                          citizenName: currentUser.name,
                          citizenPhone: '9876544821'
                        });
                      }}
                    >
                      Fill Demo Pothole Data
                    </Button>
                  </div>
                </form>
              </Card.Body>
            </Card>

            {/* Right: Citizen Charter Guidelines Box */}
            <div>
              <Card style={{ marginBottom: '1.5rem' }}>
                <Card.Header variant="navy">
                  <Card.Title icon={Info}>Reporting Guidelines</Card.Title>
                </Card.Header>
                <Card.Body>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8125rem', lineHeight: 1.8 }}>
                    <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <CheckCircle2 size={16} color="var(--color-success-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>Take clear, well-lit photos showing both close-up damage and surrounding street context.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <CheckCircle2 size={16} color="var(--color-success-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>Include landmark names (schools, banks, bus stops) to assist field inspection squads.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <CheckCircle2 size={16} color="var(--color-success-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>Submitted reports instantly sync to your Citizen Dashboard and tracking log.</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title icon={ShieldCheck}>Verification Guarantee</Card.Title>
                </Card.Header>
                <Card.Body>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    Every ticket registered in CivicReflex remains active until <strong>verified by ward citizens</strong>. Municipal engineers cannot mark work as completed without photo proof and community sign-off.
                  </p>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportIssuePage;
