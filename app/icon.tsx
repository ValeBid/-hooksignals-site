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
          background: 'linear-gradient(135deg, #06131f 0%, #070a18 48%, #1b0b35 100%)',
        }}
      >
        <div
          style={{
            width: 416,
            height: 416,
            borderRadius: 108,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '10px solid rgba(34, 242, 255, 0.8)',
            boxShadow: '0 0 48px rgba(34, 242, 255, 0.45), inset 0 0 42px rgba(168, 85, 247, 0.22)',
            background: 'radial-gradient(circle at 28% 20%, rgba(34, 242, 255, 0.18), transparent 38%), rgba(3, 7, 18, 0.8)',
          }}
        >
          <div
            style={{
              fontSize: 148,
              fontWeight: 900,
              letterSpacing: -10,
              color: '#eefbff',
              textShadow: '0 0 22px rgba(34, 242, 255, 0.6)',
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
