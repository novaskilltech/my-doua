'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/store/app-store';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, Navigation, Clock, Globe, Compass } from 'lucide-react';
import { Coordinates, CalculationMethod, PrayerTimes, Prayer } from 'adhan';



export default function PrayersPage() {
  const { t, language, isRTL } = useTranslation();
  const { userLocation, setLocation, setTopBarProps, calculationMethod, setCalculationMethod } = useAppStore();
  
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Default coordinates (Makkah) if no location stored
  const activeLat = userLocation?.latitude ?? 21.4225;
  const activeLon = userLocation?.longitude ?? 39.8262;
  const activeName = userLocation?.name ?? 'Makkah (Défaut)';
  
  useEffect(() => {
    setTopBarProps({ title: t.prayerTimes });
  }, [setTopBarProps, t.prayerTimes]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculation of prayer times using adhan
  const coordinates = new Coordinates(activeLat, activeLon);
  
  let params;
  if (calculationMethod === 'MoroccoHabous') {
    params = CalculationMethod.MuslimWorldLeague();
    params.fajrAngle = 19;
    params.ishaAngle = 17;
  } else if (calculationMethod === 'MosqueDeParis') {
    params = CalculationMethod.MuslimWorldLeague();
    params.fajrAngle = 18;
    params.ishaAngle = 18;
  } else if (calculationMethod === 'UOIF') {
    params = CalculationMethod.MuslimWorldLeague();
    params.fajrAngle = 12;
    params.ishaAngle = 12;
  } else {
    params = CalculationMethod.UmmAlQura();
  }
  
  const prayerTimes = new PrayerTimes(coordinates, currentTime, params);

  // Format Helper
  const formatTime = (timeDate: Date) => {
    if (!timeDate) return '--:--';
    return timeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const prayersList = [
    { id: 'fajr', key: Prayer.Fajr, name: t.fajr, time: prayerTimes.fajr, icon: 'wb_twilight' },
    { id: 'sunrise', key: 'sunrise', name: t.sunrise, time: prayerTimes.sunrise, icon: 'wb_sunny' },
    { id: 'dhuhr', key: Prayer.Dhuhr, name: t.dhuhr, time: prayerTimes.dhuhr, icon: 'sunny' },
    { id: 'asr', key: Prayer.Asr, name: t.asr, time: prayerTimes.asr, icon: 'wb_cloudy' },
    { id: 'maghrib', key: Prayer.Maghrib, name: t.maghrib, time: prayerTimes.maghrib, icon: 'nights_stay' },
    { id: 'isha', key: Prayer.Isha, name: t.isha, time: prayerTimes.isha, icon: 'dark_mode' },
  ];

  // Determine current/next prayer and countdown
  const currentPrayerKey = prayerTimes.currentPrayer();
  const nextPrayerKey = prayerTimes.nextPrayer();
  
  let targetPrayerName = '';
  let targetPrayerTime: Date | null = null;

  if (nextPrayerKey !== Prayer.None) {
    const match = prayersList.find(p => p.key === nextPrayerKey);
    if (match) {
      targetPrayerName = match.name;
      targetPrayerTime = match.time;
    }
  } else {
    // If next prayer is none, it means Isha has passed and the next prayer is Fajr of the next day.
    // Calculate tomorrow's Fajr
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowPrayerTimes = new PrayerTimes(coordinates, tomorrow, params);
    targetPrayerName = t.fajr;
    targetPrayerTime = tomorrowPrayerTimes.fajr;
  }

  // Countdown string
  let countdownStr = '00:00:00';
  if (targetPrayerTime) {
    const diffMs = targetPrayerTime.getTime() - currentTime.getTime();
    if (diffMs > 0) {
      const diffSecs = Math.floor(diffMs / 1000) % 60;
      const diffMins = Math.floor(diffMs / (1000 * 60)) % 60;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      countdownStr = `${diffHours.toString().padStart(2, '0')}:${diffMins.toString().padStart(2, '0')}:${diffSecs.toString().padStart(2, '0')}`;
    }
  }

  const handleGPSDetection = () => {
    if (!navigator.geolocation) {
      setGpsError("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }
    
    setGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          name: 'GPS Position',
          isGPS: true
        });
        setGpsLoading(false);
      },
      (error) => {
        console.error(error);
        setGpsError("Impossible d'accéder à votre position GPS. Veuillez vérifier vos permissions d'accès à la position.");
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 pt-24 pb-32 px-4 max-w-2xl mx-auto w-full"
      >
        <div className="bg-surface-container-lowest rounded-[32px] p-5 sm:p-8 md:p-10 shadow-md border border-outline-variant/30 space-y-8">
          
          {/* Header Description */}
          <motion.section variants={itemVariants} className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider font-body">
              <Sparkles size={12} />
              {calculationMethod === 'MoroccoHabous' 
                ? t.moroccoHabous 
                : calculationMethod === 'MosqueDeParis' 
                ? t.mosqueDeParis 
                : calculationMethod === 'UOIF' 
                ? t.uoif 
                : t.ummAlQura}
            </div>
            <h2 className="font-headline font-bold text-primary text-3xl sm:text-4xl">
              {t.prayerTimes}
            </h2>
            <div className="flex items-center justify-center gap-1.5 text-xs text-on-surface-variant">
              <MapPin size={14} className="text-secondary" />
              <span>
                {activeName === 'GPS Position' ? t.locationDetected : activeName}
              </span>
              <span className="opacity-40">•</span>
              <span className="font-mono text-[10px] bg-surface-container-high px-2 py-0.5 rounded">
                Lat: {activeLat.toFixed(4)} Lon: {activeLon.toFixed(4)}
              </span>
            </div>
          </motion.section>

          {/* Next Prayer Display (Glassmorphism & countdown) */}
          <motion.section 
            variants={itemVariants}
            className="relative overflow-hidden bg-primary text-on-primary rounded-[2rem] p-8 md:p-10 text-center shadow-xl shadow-primary/10 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-50 -z-10"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            
            <Clock className="text-secondary-container/40 mx-auto mb-4" size={36} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-container/85 block mb-1">
              {t.nextPrayer}
            </span>
            <h3 className="font-headline font-bold text-3xl md:text-4xl text-white mb-2">
              {targetPrayerName} à {targetPrayerTime ? formatTime(targetPrayerTime) : '--:--'}
            </h3>
            
            {/* Timer Countdown */}
            <div className="mt-6 inline-flex flex-col items-center px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="font-mono text-3xl md:text-4.5xl tracking-widest text-secondary-container font-bold">
                {countdownStr}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-white/75 mt-1 font-bold">
                {t.timeRemaining}
              </span>
            </div>
          </motion.section>

          {/* Prayers Grid */}
          <motion.section variants={itemVariants} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {prayersList.map((prayer) => {
                const isActive = currentPrayerKey === prayer.key;
                const isNext = nextPrayerKey === prayer.key;
                
                return (
                  <div 
                    key={prayer.id}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary/5 border-primary/30 shadow-md ring-1 ring-primary/15'
                        : isNext
                        ? 'bg-secondary-container/30 border-secondary-container/50'
                        : 'bg-surface-container-high/45 border-outline-variant/20 hover:border-outline-variant/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isActive 
                          ? 'bg-primary text-on-primary' 
                          : 'bg-surface-container text-on-surface-variant'
                      }`}>
                        <span className="material-symbols-outlined text-lg">{prayer.icon}</span>
                      </div>
                      <div className="space-y-0.5">
                        <p className={`font-headline text-base font-bold ${isActive ? 'text-primary' : 'text-on-surface'}`}>
                          {prayer.name}
                        </p>
                        {isActive && (
                          <span className="inline-block bg-primary/15 text-primary text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                            En cours
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`font-mono text-lg font-bold ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {formatTime(prayer.time)}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Settings Section (GPS detection & Town selections) */}
          <motion.section 
            variants={itemVariants}
            className="bg-surface-container rounded-[2rem] p-6 sm:p-8 space-y-6 border border-outline-variant/30"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">compass_calibration</span>
              <h4 className="font-headline font-bold text-primary text-base">Configuration de la localisation</h4>
            </div>

            <div className="flex flex-col gap-4">
              {/* GPS Button */}
              <button
                onClick={handleGPSDetection}
                disabled={gpsLoading}
                className="w-full bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container disabled:bg-surface-container disabled:text-on-surface-variant/40 py-4 px-6 rounded-2xl font-bold text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {gpsLoading ? (
                  <div className="w-4 h-4 border-2 border-on-primary/20 border-t-on-primary rounded-full animate-spin" />
                ) : (
                  <Compass size={16} />
                )}
                {t.detectLocation}
              </button>
            </div>

            {/* Errors display */}
            <AnimatePresence>
              {gpsError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-error-container/20 border border-error/20 rounded-2xl text-xs text-error flex gap-3 items-start"
                >
                  <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">error</span>
                  <span>{gpsError}</span>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Calculation Method Selector */}
            <div className="space-y-3 pt-4 border-t border-outline-variant/20">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Globe size={14} className="text-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Méthode de calcul</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCalculationMethod('UmmAlQura')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all active:scale-[0.98] ${
                    calculationMethod === 'UmmAlQura'
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-surface-container-high/40 border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/50'
                  }`}
                >
                  Umm Al-Qura
                </button>
                <button
                  onClick={() => setCalculationMethod('MoroccoHabous')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all active:scale-[0.98] ${
                    calculationMethod === 'MoroccoHabous'
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-surface-container-high/40 border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/50'
                  }`}
                >
                  Maroc (Habous)
                </button>
                <button
                  onClick={() => setCalculationMethod('MosqueDeParis')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all active:scale-[0.98] ${
                    calculationMethod === 'MosqueDeParis'
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-surface-container-high/40 border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/50'
                  }`}
                >
                  Mosquée de Paris (18°)
                </button>
                <button
                  onClick={() => setCalculationMethod('UOIF')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all active:scale-[0.98] ${
                    calculationMethod === 'UOIF'
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-surface-container-high/40 border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/50'
                  }`}
                >
                  UOIF (12°)
                </button>
              </div>
            </div>
          </motion.section>

        </div>
      </motion.main>
    </div>
  );
}
