import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useReports } from '../../hooks/useReports';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import {
  MapPin,
  Camera,
  CheckCircle2,
  Upload,
  HardHat,
  FileText,
  PlayCircle
} from 'lucide-react';

export const OfficerInspectionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestedTicket = searchParams.get('ticket') || '';

  const { user } = useAuth();
  const { reports, getTicket, updateFieldInspection } = useReports();

  const officerId = user?.id || 'OFF-PWD-014';
  const officerName = user?.name || 'Mr. V. Nair';

  // My Assigned reports
  const myAssignedReports = useMemo(() => {
    return reports.filter(
      (r) => r.assignedOfficerId === officerId ||
             (r.assignedOfficer && r.assignedOfficer.includes(officerName))
    );
  }, [reports, officerId, officerName]);

  const [activeTicketId, setActiveTicketId] = useState(
    requestedTicket || (myAssignedReports[0]?.ticketNumber || 'CR-2026-8842')
  );

  // Sync if query param changes
  const [prevParam, setPrevParam] = useState(requestedTicket);
  if (requestedTicket !== prevParam) {
    setPrevParam(requestedTicket);
    if (requestedTicket) {
      setActiveTicketId(requestedTicket);
    }
  }

  const currentTicket = getTicket(activeTicketId);

  // Local Form States for the 6 Field Actions
  const [inspectionStarted, setInspectionStarted] = useState(false);
  const [measurements, setMeasurements] = useState('Depth: 18cm | Surface Width: 1.4m x 1.2m | Cold mix asphalt required: 2.5 Tons');
  const [recommendedSquad, setRecommendedSquad] = useState('PWD Road Patchwork Quick Squad #4');
  const [inspectionRemarks, setInspectionRemarks] = useState(
    'Inspected on site. Sub-base aggregate damaged due to water pooling. Excavation and tack coat priming required before bituminous asphalt top layer.'
  );

  // Photographs with local previews
  const [beforePhotoPreview, setBeforePhotoPreview] = useState(
    currentTicket?.inspectionDetails?.beforePhotoUrl ||
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80'
  );
  const [afterPhotoPreview, setAfterPhotoPreview] = useState(
    currentTicket?.inspectionDetails?.afterPhotoUrl || ''
  );

  const [completionReport, setCompletionReport] = useState(
    'Excavation of damaged subgrade completed. Applied prime coat of bitumen emulsion followed by 50mm compacted bituminous concrete. Level checked with straightedge.'
  );

  const [actionSuccessNotice, setActionSuccessNotice] = useState('');

  // Handle Before Photo file input
  const handleBeforePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBeforePhotoPreview(reader.result);
        updateFieldInspection(activeTicketId, {
          action: 'upload_photos',
          beforePhotoUrl: reader.result,
          officerUser: user
        });
        setActionSuccessNotice('Before-remediation photographic evidence saved.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle After Photo file input
  const handleAfterPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAfterPhotoPreview(reader.result);
        updateFieldInspection(activeTicketId, {
          action: 'upload_photos',
          afterPhotoUrl: reader.result,
          officerUser: user
        });
        setActionSuccessNotice('After-remediation photographic evidence saved.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset demo after photo for easy evaluation
  const handleLoadDemoAfterPhoto = () => {
    const demoAfterUrl = 'https://images.unsplash.com/photo-1584463699059-88029d5970c7?auto=format&fit=crop&w=600&q=80';
    setAfterPhotoPreview(demoAfterUrl);
    updateFieldInspection(activeTicketId, {
      action: 'upload_photos',
      afterPhotoUrl: demoAfterUrl,
      officerUser: user
    });
    setActionSuccessNotice('Demo post-remediation photographic proof loaded.');
  };

  // Action 1: Mark Inspection Started
  const handleStartInspection = () => {
    updateFieldInspection(activeTicketId, {
      action: 'start_inspection',
      officerUser: user
    });
    setInspectionStarted(true);
    setActionSuccessNotice('Site inspection marked as STARTED. Timestamp logged in municipal audit trail.');
  };

  // Action 2: Submit Inspection Remarks
  const handleSubmitInspectionRemarks = (e) => {
    e.preventDefault();
    updateFieldInspection(activeTicketId, {
      action: 'submit_inspection',
      remarks: inspectionRemarks,
      measurements,
      recommendedSquad,
      officerUser: user
    });
    setActionSuccessNotice('Engineering inspection findings and measurements recorded.');
  };

  // Action 3: Mark Work In Progress
  const handleMarkWorkInProgress = () => {
    updateFieldInspection(activeTicketId, {
      action: 'start_work',
      remarks: 'Contractor squad deployed on ground. Materials and roller machine operating.',
      officerUser: user
    });
    setActionSuccessNotice('Work Order marked as IN PROGRESS. Contractor squad officially deployed.');
  };

  // Action 6: Submit Completion Report (moves to "Resolved", awaiting citizen confirmation)
  const handleSubmitCompletionReport = (e) => {
    e.preventDefault();
    if (!afterPhotoPreview) {
      setActionSuccessNotice('Please upload or load an After Photograph before submitting the final completion report.');
      return;
    }

    updateFieldInspection(activeTicketId, {
      action: 'complete_work',
      completionReport,
      beforePhotoUrl: beforePhotoPreview,
      afterPhotoUrl: afterPhotoPreview,
      officerUser: user
    });
    setActionSuccessNotice('Work order marked as RESOLVED! Evidence submitted to Citizen Verification Protocol for citizen sign-off.');
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary-navy)', margin: '0 0 0.25rem 0' }}>
            Site Inspection & Work Order Execution Console
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Field inspection logging, defect measurements, before/after evidence photographic upload, and completion certification.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            variant="secondary"
            onClick={() => navigate('/officer/assigned-work')}
          >
            ← Back to Work Orders
          </Button>
        </div>
      </div>

      {actionSuccessNotice && (
        <div style={{ marginBottom: '1.25rem' }}>
          <Alert type="success" title="Field Operation Successfully Recorded">
            {actionSuccessNotice}
          </Alert>
        </div>
      )}

      {/* Select Active Work Order */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          padding: '1rem 1.25rem',
          boxShadow: 'var(--shadow-subtle)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}
      >
        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary-navy)' }}>
          Active Assignment Ticket:
        </span>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {myAssignedReports.map((r) => (
            <button
              key={r.ticketNumber}
              type="button"
              onClick={() => {
                setActiveTicketId(r.ticketNumber);
                setSearchParams({ ticket: r.ticketNumber });
                setActionSuccessNotice('');
              }}
              style={{
                backgroundColor: activeTicketId === r.ticketNumber ? 'var(--color-gov-blue)' : '#F1F5F9',
                color: activeTicketId === r.ticketNumber ? '#FFFFFF' : 'var(--color-dark-slate)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                padding: '4px 10px',
                fontSize: '0.8125rem',
                fontFamily: 'monospace',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {r.ticketNumber} ({r.severity})
            </button>
          ))}
        </div>
      </div>

      {currentTicket ? (
        <div>
          {/* Header Summary Box */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderTop: '4px solid var(--color-gold)',
              borderRadius: '2px',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-primary-navy)' }}>
                    {currentTicket.ticketNumber}
                  </span>
                  <Badge status={currentTicket.currentStatus} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '2px', backgroundColor: '#FEF3C7', color: '#92400E' }}>
                    {currentTicket.urgencyLevel}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary-navy)', margin: '0.35rem 0' }}>
                  {currentTicket.subject}
                </h3>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                  {currentTicket.address} • {currentTicket.ward}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Resolution Target SLA:</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-success-green)', marginTop: '2px' }}>
                  {currentTicket.expectedResolutionDate}
                </div>
              </div>
            </div>

            {/* Authority Instructions Banner */}
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', padding: '0.875rem 1rem', borderRadius: '2px', fontSize: '0.8125rem' }}>
              <strong style={{ color: 'var(--color-gov-blue)' }}>Superintending Engineer Work Order Instructions: </strong>
              <span>
                "Deploy on-ground squad. Measure defect depth and surface square footage. Ensure cold mix compaction meets IRC:SP:100 standards."
              </span>
            </div>
          </div>

          {/* 6 Actions Execution Panels */}
          <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '2rem', alignItems: 'flex-start' }}>
            {/* Panel 1: Actions 1, 2, 3 (Inspection Initiation & Measurements) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: '0 0 1rem 0' }}>
                Phase 1: Site Inspection & Squad Dispatch
              </h3>

              {/* Action 1: Mark Inspection Started */}
              <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', borderRadius: '2px', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', fontSize: '0.875rem' }}>
                      Action 1: Mark Inspection Started
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                      Log physical arrival of junior engineer inspection team at the defect location.
                    </div>
                  </div>
                  <Button
                    variant={inspectionStarted ? 'success' : 'primary'}
                    size="sm"
                    icon={inspectionStarted ? CheckCircle2 : PlayCircle}
                    onClick={handleStartInspection}
                    disabled={inspectionStarted}
                  >
                    {inspectionStarted ? 'Inspection Active' : 'Start Inspection'}
                  </Button>
                </div>
              </div>

              {/* Action 2: Submit Inspection Remarks */}
              <form onSubmit={handleSubmitInspectionRemarks} style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  Action 2: Technical Defect Assessment & Measurements
                </div>

                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Physical Defect Measurements & Volume:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={measurements}
                    onChange={(e) => setMeasurements(e.target.value)}
                    style={{ fontSize: '0.8125rem' }}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Assigned Engineering / Contractor Squad:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={recommendedSquad}
                    onChange={(e) => setRecommendedSquad(e.target.value)}
                    style={{ fontSize: '0.8125rem' }}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Junior Engineer Site Notes & Diagnostics:</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={inspectionRemarks}
                    onChange={(e) => setInspectionRemarks(e.target.value)}
                    style={{ fontSize: '0.8125rem' }}
                    required
                  />
                </div>

                <Button variant="secondary" size="sm" type="submit" icon={FileText}>
                  Submit & Log Inspection Remarks
                </Button>
              </form>

              {/* Action 3: Mark Work In Progress */}
              <div style={{ padding: '1rem', backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '2px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0369A1', fontSize: '0.875rem' }}>
                      Action 3: Mobilize Squad & Mark Work In Progress
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#0284C7' }}>
                      Transitions live grievance status to "In Progress".
                    </div>
                  </div>
                  <Button
                    variant="gold"
                    size="sm"
                    icon={HardHat}
                    onClick={handleMarkWorkInProgress}
                  >
                    Mark In Progress
                  </Button>
                </div>
              </div>
            </div>

            {/* Panel 2: Actions 4, 5, 6 (Photographic Uploads & Completion Report) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: '0 0 1rem 0' }}>
                Phase 2: Photo Proof & Work Completion Sign-off
              </h3>

              {/* Action 4 & 5: Before and After Photographs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                {/* Action 4: Before Photo */}
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '0.35rem' }}>
                    Action 4: Before Photo
                  </div>
                  <div
                    style={{
                      height: '140px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      backgroundColor: '#F8FAFC',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {beforePhotoPreview ? (
                      <img src={beforePhotoPreview} alt="Before remediation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94A3B8', fontSize: '0.75rem' }}>
                        No Before Photo
                      </div>
                    )}
                  </div>
                  <label
                    style={{
                      display: 'block',
                      backgroundColor: '#F1F5F9',
                      border: '1px solid var(--color-border)',
                      padding: '4px 8px',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      borderRadius: '2px',
                      cursor: 'pointer'
                    }}
                  >
                    <Upload size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Upload Local File
                    <input type="file" accept="image/*" onChange={handleBeforePhotoChange} style={{ display: 'none' }} />
                  </label>
                </div>

                {/* Action 5: After Photo */}
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '0.35rem' }}>
                    Action 5: After Photo (Proof)
                  </div>
                  <div
                    style={{
                      height: '140px',
                      border: afterPhotoPreview ? '2px solid var(--color-success-green)' : '1px dashed #CBD5E1',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      backgroundColor: '#F8FAFC',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {afterPhotoPreview ? (
                      <img src={afterPhotoPreview} alt="After remediation proof" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94A3B8', fontSize: '0.75rem', padding: '0.5rem', textAlign: 'center' }}>
                        <Camera size={20} style={{ marginBottom: '4px' }} />
                        <span>Awaiting After-Work Evidence</span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <label
                      style={{
                        flex: 1,
                        backgroundColor: '#F1F5F9',
                        border: '1px solid var(--color-border)',
                        padding: '4px',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        textAlign: 'center',
                        borderRadius: '2px',
                        cursor: 'pointer'
                      }}
                    >
                      <Upload size={11} style={{ display: 'inline', marginRight: '3px' }} />
                      File
                      <input type="file" accept="image/*" onChange={handleAfterPhotoChange} style={{ display: 'none' }} />
                    </label>
                    <button
                      type="button"
                      onClick={handleLoadDemoAfterPhoto}
                      style={{
                        flex: 1,
                        backgroundColor: '#FEF3C7',
                        border: '1px solid #FDE68A',
                        color: '#92400E',
                        padding: '4px',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        borderRadius: '2px',
                        cursor: 'pointer'
                      }}
                    >
                      Demo Proof
                    </button>
                  </div>
                </div>
              </div>

              {/* Action 6: Submit Completion Report */}
              <form onSubmit={handleSubmitCompletionReport}>
                <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  Action 6: Engineering Completion Certification
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Technical Completion Summary:</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={completionReport}
                    onChange={(e) => setCompletionReport(e.target.value)}
                    style={{ fontSize: '0.8125rem' }}
                    required
                  />
                </div>

                <Button
                  variant="success"
                  type="submit"
                  fullWidth
                  icon={CheckCircle2}
                  style={{ fontWeight: 700, padding: '0.75rem' }}
                >
                  Submit Remediation Completion Report
                </Button>

                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                  <strong>Statutory Notice:</strong> Submitting this report advances ticket to <em>Resolved</em>. Per GIGW separation of duties, final <em>Citizen-Confirmed</em> status requires independent resident sign-off.
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)' }}>
          No work order selected. Please select a ticket from your assigned work list.
        </div>
      )}
    </div>
  );
};

export default OfficerInspectionsPage;
