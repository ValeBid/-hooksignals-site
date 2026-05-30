import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #06131f 0%, #070a18 50%, #1b0b35 100%)',
        }}
      >
        <div
          style={{
            width: 146,
            height: 146,
            borderRadius: 38,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '7px',
            paddingBottom: '28px',
            border: '5px solid rgba(34, 211, 238, 0.6)',
            boxShadow: '0 0 24px rgba(34, 211, 238, 0.35)',
            background: 'rgba(3, 7, 18, 0.88)',
          }}
        >
          <div style={{ width: 18, height: 30, background: '#22d3ee', borderRadius: '3px' }} />
          <div style={{ width: 18, height: 58, background: '#22d3ee', borderRadius: '3px' }} />
          <div style={{ width: 18, height: 88, background: '#22d3ee', borderRadius: '3px' }} />
        </div>
      </div>
    ),
    size
  );
}
