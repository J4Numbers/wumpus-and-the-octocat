import { expect } from "chai";
// @ts-ignore
import GithubFormatters from "../../../../../../src/ts/github/formatters";

const dummyPush = require("../../../../../../data/dummy-push")


describe("GitHub Webhook push formatter", function () {
   it("Should return a default sentence when no commits are found", function () {
       expect(GithubFormatters.push(dummyPush)).to.equal('New push event on branch \'refs/tags/simple-tag\' with commits:\n');
   });

   it("Should create a new line when commits are included in the data", function () {
      const copyPush = dummyPush;
      copyPush.commits.push({
          "id": "039fb150a287031ae2404320680a41fbf1be85e1",
          "tree_id": "5682731b92f0b03a0f1339f34e682ca01014d67a",
          "distinct": true,
          "message": "start writing in tests for typescript",
          "timestamp": "2020-07-11T04:03:53+01:00",
          "url": "https://github.com/J4Numbers/wumpus-and-the-octocat/commit/039fb150a287031ae2404320680a41fbf1be85e1",
          "author": {
              "name": "J4Numbers",
              "email": "j4numbers@gmail.com",
              "username": "J4Numbers"
          },
          "committer": {
              "name": "J4Numbers",
              "email": "j4numbers@gmail.com",
              "username": "J4Numbers"
          },
          "added": [
              "test/.ts.mocharc.js",
              "test/spec/app/ts/github/formatters/test_create_format_spec.ts",
              "test/spec/app/ts/github/formatters/test_ping_format_spec.ts",
              "test/spec/app/ts/github/formatters/test_push_format_spec.ts"
          ],
          "removed": [],
          "modified": [
              "package-lock.json",
              "package.json",
              "src/ts/github/formatters/push.ts"
          ],
      });
      expect(GithubFormatters.push(copyPush)).to.contain('\t2020-07-11T04:03:53+01:00 :: J4Numbers :: start writing in tests for typescript\n');
   });
});
