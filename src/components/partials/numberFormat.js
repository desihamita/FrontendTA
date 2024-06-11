export const formatRupiah = (number) => {
    return `Rp.${number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};