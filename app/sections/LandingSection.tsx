export default function LandingSection(){
    return <section style={{
        backgroundColor: 'var(--red-500)',
        width: '100%',
        height: 'calc(100vh - 44px)',
        position: 'relative',
    }}>
        <div style={{
            height: '34.109vh',
            background: 'linear-gradient(#881700, #B62507)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1
        }}></div>
        <img src="/images/landing/landing-section-bg.svg" style={{
            height: 'calc(100vh - 44px)',
            position: 'absolute',
            objectFit: 'cover',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1,
            opacity: 0.5
        }}/>
        <img className="scale-300 md:scale-100" src="/images/landing/bottom-border.svg" style={{
            position: 'absolute',
            bottom: '0px',
            left: 0,
            width: '100%',
            zIndex: 2,
        }}/>
    </section>
}