export default function (index: number, defender: any) {
    if (defender === undefined) return;
    defender.emit('peek', index);
    return
}