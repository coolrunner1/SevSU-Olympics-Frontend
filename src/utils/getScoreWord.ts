export const getScoreWord = (score: number): string => {
    const lastDigit = Number(String(score).slice(-1));

    if ((score >= 11 && score <= 14) || !lastDigit || lastDigit >= 5) {
        return "баллов";
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return "балла";
    }

    return "балл";
}