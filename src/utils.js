const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-awesome';

// トークンを複合
function getTokenPayload(token) {
  // トークン化された物の前の情報（user.id）を複合
  return jwt.verify(token, APP_SECRET);
}

// ユーザーIDを取得するための関数
function getUserId(req, authToken) {
  if (req) {
    // ヘッダーを確認し、認証権限があるか確認
    const authHeader = req.headers.authorization;
    // 権限があるなら
    if (authHeader) {
      const token = authHeader.replace('Bearer', '');
      if (!token) {
        throw new Error('トークンが見つかりませんでした');
      }
      // トークンを複合
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error('認証権限がありません');
}

module.exports = {
  APP_SECRET,
  getUserId,
};
