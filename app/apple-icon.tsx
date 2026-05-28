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
            borderRadius: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '5px solid rgba(34, 242, 255, 0.82)',
            boxShadow: '0 0 24px rgba(34, 242, 255, 0.48), inset 0 0 18px rgba(168, 85, 247, 0.24)',
            background: 'radial-gradient(circle at 30% 22%, rgba(34, 242, 255, 0.22), transparent 40%), rgba(3, 7, 18, 0.86)',
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: -4,
              color: '#eefbff',
              fontFamily: 'Arial, Helvetica, sans-serif',
            }}
          >
            HS
          </div>
        </div>
      </div>
    ),
    size
  );
}
