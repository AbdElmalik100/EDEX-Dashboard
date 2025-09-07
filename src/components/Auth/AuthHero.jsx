import { randomImages } from "../../constants"

const AuthHero = () => {
    const generateRandomImages = () => randomImages[Math.floor(Math.random() * randomImages.length)]

    return (
        <div className="w-full relative flex-1">
            <img src={generateRandomImages()} className="w-full h-full object-cover" alt="Auth Image" />
            <div className="rounded-2xl bg-white/5 backdrop-blur-xs shadow-md p-8 flex flex-col gap-2 absolute bottom-6 w-[calc(100%-32px)] left-1/2 -translate-x-1/2 text-white">
                <h2 className="font-bold text-2xl">
                    فوج تشهيلات مطارات قوات مسلحة
                </h2>
                <p className="text-base">
                    فوج تسهيلات المطارات بالقوات المسلحة هو أحد التشكيلات المتخصصة التي تضطلع بمهمة تأمين وتسهيل حركة الطيران العسكري والمدني داخل المطارات التابعة للقوات المسلحة أو التي تقع في نطاق مسؤوليتها. يقوم الفوج بتقديم الدعم الفني واللوجيستي، وتنظيم حركة الأفراد والمعدات، وضمان أعلى درجات الانضباط والأمن داخل المطار، بما يحقق سرعة وكفاءة في العمليات الجوية. كما يساهم في التنسيق مع مختلف الأجهزة الأمنية والجهات التنفيذية لضمان انسيابية العمل والحفاظ على سلامة الركاب والطائرات والمنشآت.
                </p>
            </div>
        </div>
    )
}

export default AuthHero