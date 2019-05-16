import React from 'react';

export function PHSlider({ min, max }) {
  const lowRange = (min / 14) * 100;
  const range = ((max - min) / 14) * 100;
  const smoothRange =
    (((max + 2 > 14 ? 14 : max + 2) - (min - 2 < 0 ? 0 : min - 2)) / 14) * 100;
  const highRange = ((14 - max) / 14) * 100;
  const lowBound = (100 * min) / 14;
  const lowBoundSmooth = (100 * (min - 2 < 0 ? 0 : min - 2)) / 14;
  const highBound = (100 * max) / 14;
  return (
    <div className="w-75 mt-3">
      <div className="gar-ph-viewer">
        <div
          style={{
            width: `${range === 0 ? smoothRange : range}%`,
            left: `${range === 0 ? lowBoundSmooth : lowBound}%`
          }}
          className="gar-ph-viewer-mark-optimal"
        >
          <span
            style={{
              left: `50%`,
              transform: 'translateX(-50%)'
            }}
            className="gar-ph-viewer-mark-optimal-text small text-muted text-uppercase"
          >
            Optimal
          </span>
        </div>

        <div className="gar-ph-viewer-mark">
          <span
            style={{ transform: 'translateX(-50%)', left: '0%' }}
            className="gar-ph-viewer-mark-text"
          >
            Acide
          </span>
          <span
            style={{ transform: 'translateX(-50%)', left: '50%' }}
            className="gar-ph-viewer-mark-text"
          >
            Neutre
          </span>
          <span
            style={{ transform: 'translateX(-50%)', left: '100%' }}
            className="gar-ph-viewer-mark-text"
          >
            Alcalin
          </span>
        </div>
        <span
          style={{ left: '0%', width: `${lowRange}%` }}
          className="gar-invalid-left-ph"
        />
        <span
          style={{
            borderRadius: `
             ${lowRange > 0 ? 0 : 6}px
             ${highRange > 0 ? 0 : 6}px
             ${highRange > 0 ? 0 : 6}px
             ${lowRange > 0 ? 0 : 6}px
            `,
            left: `${lowBound}%`,
            width: `${range}%`
          }}
          className="gar-valid-ph"
        />
        <span
          style={{ left: `${highBound}%`, width: `${highRange}%` }}
          className="gar-invalid-right-ph"
        />
      </div>
    </div>
  );
}
