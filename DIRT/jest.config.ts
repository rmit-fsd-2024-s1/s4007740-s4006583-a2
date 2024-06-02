module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		// process `*.tsx` files with `ts-jest`
	},
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/DIRT/test/__mocks__/fileMock.js',
		'\\.css$': '<rootDir>/DIRT/src/styles/__mocks__/styleMock.js',
	},
};
