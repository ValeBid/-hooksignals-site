import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 512,
  height: 512,
};
export const contentType = 'image/png';

export default function Icon() {
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
            width: 416,
            height: 416,
            borderRadius: 108,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '20px',
            paddingBottom: '80px',
            border: '10px solid rgba(34, 211, 238, 0.55)',
            boxShadow: '0 0 60px rgba(34, 211, 238, 0.25)',
            background: 'rgba(3, 7, 18, 0.88)',
          }}
        >
          <div style={{ width: 52, height: 90, background: '#22d3ee', borderRadius: '8px' }} />
          <div style={{ width: 52, height: 175, background: '#22d3ee', borderRadius: '8px' }} />
          <div style={{ width: 52, height: 260, background: '#22d3ee', borderRadius: '8px' }} />
        </div>
      </div>
    ),
    size
  );
}
