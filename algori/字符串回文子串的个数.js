// 返回字符串回文子串的个数
// aba => a b a aba 4个
// abba => a b b a bb abba 6
// ababba => a b a b b a aba bab bb abba 10

// 思路一: 暴力遍历， 循环每个串 从该串位置向左向右再遍历 可以为s[k+j] == s[k-j] 或者s[k+j] == s[k-j+1]

var countSubstrings = function(s) {
    let count = 0;

    const find = (s, i, j) => {
        while (i >= 0 && j < s.length && s[i] == s[j]) {
            count++;
            i--;
            j++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        find(s, i, i); // aba
        find(s, i, i+1); // abba
    }
    return count;
};

// test
countSubstrings('aba');
countSubstrings('abba');
countSubstrings('ababba');
