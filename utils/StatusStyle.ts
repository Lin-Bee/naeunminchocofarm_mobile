export const getStatusStyle = (status?: string) => {
    switch (status) {
      case '운영중':
        return { borderRadius: 999, paddingVertical: 4, paddingHorizontal: 8,  fontSize: 12,
          backgroundColor: '#D1FAE5', color: '#059669' }; 
      case '점검중':
        return { borderRadius: 999, paddingVertical: 4, paddingHorizontal: 8,  fontSize: 12, 
          backgroundColor: '#FEF3C7', color: '#D97706' }; 
      case '폐쇄':
        return { borderRadius: 999, paddingVertical: 4, paddingHorizontal: 8,  fontSize: 12, 
          backgroundColor: '#FECACA', color: '#DC2626' }; 
      default:
        return { borderRadius: 999, paddingVertical: 4, paddingHorizontal: 8,  fontSize: 12, 
          backgroundColor: '#E5E7EB', color: '#6B7280' }; 
    }
  };

  export const getStatusBadgeStyle = (statusLabel?: string) => {
    switch (statusLabel) {
      case '정상':
        return {
          backgroundColor: '#D1FAE5',
          borderColor: '#34D399',
          color: '#059669',
        };
      case '고온':
      case '위험':
      case '건조':
        return {
          backgroundColor: '#FECACA',
          borderColor: '#F87171',
          color: '#DC2626',
        };
      case '저온':
      case '과습':
        return {
          backgroundColor: '#DBEAFE',
          borderColor: '#60A5FA',
          color: '#2563EB',
        };
      default:
        return {
          backgroundColor: '#E5E7EB',
          borderColor: '#9CA3AF',
          color: '#6B7280',
        };
    }
  };