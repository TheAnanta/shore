import Link from "next/link";

export default function LandingSection(){
    return <section style={{
        backgroundColor: 'var(--red-500)',
        width: '100%',
        height: 'calc(100vh - 44px)',
        position: 'relative',
        overflow: 'hidden'
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
        <img src="/images/landing/landing-section-bg.png" style={{
            height: 'calc(100vh - 44px)',
            position: 'absolute',
            objectFit: 'cover',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1,
            opacity: 0.5
        }}/>
        <img className="scale-400 bottom-16 md:bottom-0 md:scale-100" src="/images/landing/bottom-border.png" style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            zIndex: 3,
        }}/>
        <img className="hidden md:block md:scale-100" src="/images/landing/rock_right.svg" style={{
            position: 'absolute',
            height: '45vh',
            bottom: '-60px',
            right: 0,
            zIndex: 2,
        }}/>
        <img className="scale-150 md:scale-100 bottom-[-100px] md:bottom-[-60px]" src="/images/landing/rock_left.svg" style={{
            position: 'absolute',
            height: '45vh',
            left: 0,
            zIndex: 2,
        }}/>
        
        <img className="hidden md:block md:scale-100" src="/images/landing/dolphin-right.png" style={{
            position: 'absolute',
            height: '45vh',
            bottom: '19vh',
            right: '5vw',
            zIndex: 1,
        }}/>
        <div className="z-10 relative flex flex-col items-center justify-center">
            <div className="flex w-full h-12 my-6 md:my-4 px-6 md:px-8 items-center">
                <img className="h-10" src={'/images/gitam-logo.svg'}/>
                <div className="w-full"/>
                <img className="h-12" src={'/images/gitam-partners-logos.svg'} />
                <Link href={'/login'} className="hidden md:blocktext-white px-8 py-3 font-bold rounded-full ml-8 text-sm bg-white/20 border-white border">Login</Link>
            </div>
            <h3 className="mt-20 md:mt-6 text-[1rem] md:text-2xl font-extrabold uppercase">Unity in Diversity | 30th Jan - 1st Feb</h3>
            <img src="/images/landing/shore-logo.svg" className="lg:h-[45vh] h-auto px-6 lg:px-[unset]"/>
            <img src={"/images/landing/downward-arrow.svg"} className="size-10 translate-y-8"/>
        </div>
        <img className="hidden md:block md:scale-100 h-[38vh] left-[20%] z-1 md:h-[45vh] relative bottom-[-6vh] md:bottom-[19vh] md:left-[5vw] md:absolute" src="/images/landing/dolphin-left.png"/>    
        <img className="md:hidden px-6 md:scale-100 z-10 md:h-[45vh] relative bottom-[-5vh] -rotate-6 -translate-x-6 md:bottom-[19vh] md:left-[5vw] md:absolute" src="/images/landing/gitfin-relaxing.png"/>    
    </section>
}