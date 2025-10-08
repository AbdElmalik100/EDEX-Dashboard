// Script لحذف الأعضاء المعلقة (بدون وفود)
console.log('بدء تنظيف الأعضاء المعلقة...')

// جلب البيانات من localStorage
const savedDelegations = localStorage.getItem('delegations')
const savedMembers = localStorage.getItem('members')

if (savedDelegations && savedMembers) {
    try {
        const delegations = JSON.parse(savedDelegations)
        const members = JSON.parse(savedMembers)
        
        // الحصول على IDs الوفود الموجودة
        const delegationIds = delegations.map(d => d.id)
        
        // فلترة الأعضاء - الاحتفاظ فقط بالأعضاء المرتبطة بوفود موجودة
        const validMembers = members.filter(member => {
            // إذا كان العضو مربوط بوفد
            if (member.delegation && member.delegation.id) {
                return delegationIds.includes(member.delegation.id)
            }
            // إذا لم يكن مربوط بوفد، احتفظ به (قد يكون عضو مستقل)
            return true
        })
        
        // حساب عدد الأعضاء المحذوفة
        const deletedCount = members.length - validMembers.length
        
        // حفظ الأعضاء المفلترة
        localStorage.setItem('members', JSON.stringify(validMembers))
        
        console.log(`تم حذف ${deletedCount} عضو معلق`)
        console.log(`عدد الأعضاء قبل التنظيف: ${members.length}`)
        console.log(`عدد الأعضاء بعد التنظيف: ${validMembers.length}`)
        console.log(`عدد الوفود: ${delegations.length}`)
        
        // إرسال حدث لتحديث الصفحة
        window.dispatchEvent(new CustomEvent('memberDeleted'))
        
        alert(`تم تنظيف الأعضاء المعلقة!\nتم حذف ${deletedCount} عضو معلق`)
        
    } catch (error) {
        console.error('خطأ في تنظيف الأعضاء:', error)
        alert('حدث خطأ أثناء تنظيف الأعضاء')
    }
} else {
    console.log('لا توجد بيانات في localStorage')
    alert('لا توجد بيانات في localStorage')
}
