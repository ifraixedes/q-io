"use strict";

require("../../lib/jasmine-promise");
var Q = require("q");
var FS = require("../../../fs");

describe("move", function () {
    it("should move", function () {

        return FS.mock(FS.join(__dirname, "fixture"))
        .then(function (mock) {

            // initial list
            return Q.fcall(function () {
                return mock.listTree()
            })
            .then(function (list) {
                expect(list).toEqual([
                    ".",
                    "hello.txt"
                ]);
            })

            // initial content
            .then(function () {
                return mock.read("hello.txt");
            })
            .then(function (content) {
                expect(content).toBe("Hello, World!\n");
            })

            // move!
            .then(function () {
                return mock.move("hello.txt", "new-hello.txt");
            })

            // list after
            .then(function () {
                return mock.listTree();
            })
            .then(function (list) {
                expect(list).toEqual([
                    ".",
                    "new-hello.txt"
                ]);
            })

            // content after
            .then(function () {
                return mock.read("new-hello.txt");
            })
            .then(function (content) {
                expect(content).toBe("Hello, World!\n");
            })

        });
    });
});

