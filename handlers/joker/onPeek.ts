export default function (index: number, defender: any) {
    defender.getSocket().emit('peek', index);
    return
}