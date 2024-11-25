var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");

const uri = "";
const client = new MongoClient(uri);

router.get('/', async (req, res) => {
  try {
    // クライアント接続を確認
    await client.connect();

    // データベースとコレクションを指定
    const database = client.db('notes');
    const notes = database.collection('notes');

    // クエリ条件を指定
    const query = { id: 2 };
    const note = await notes.findOne(query);

    // データをレスポンスとして返す
    res.json(note);
  } catch (error) {
    // エラー処理
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // クライアント接続を閉じる
    await client.close();
  }
});

module.exports = router;