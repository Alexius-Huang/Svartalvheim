<template>
  <section class="bar-chart chart">
    <div class="title-wrapper">
      <h1 class="title">Area Chart</h1>
    </div>

    <article class="infos">
      <template v-for="({ title: t, content: c }) in chartInfo">
        <h2 class="title" :key="t">{{ t }}</h2>
        <p v-for="(paragraph, j) in c" :key="`${t}-${j}`" v-html="paragraph" />
      </template>

      <p>
        <span class="tag">Finance & Accounting</span>
        Apple's Products' Revenue From 2012 to 2018 (in Million U.S. Dollars) Quarter Results
      </p>

      <div class="chart finance-accounting-example">
      </div>
    </article>
  </section>
</template>

<script>
import { areaChart as chartInfo } from './info.json';
import data from '@/resources/inguz/apple-income-statistic.json';

const _roundDigits = 100;
const _round = num => Math.round(num * _roundDigits) / _roundDigits;
const _sum = arr => _round(arr.reduce((acc, cur) => acc + cur));

const deriveProductRevenueEachQuarter = function (product) {
  return function () {
    const { data } = this;
    return data.map(({ year, Q1, Q2, Q3, Q4 }) => ({
      year,
      result: [Q1[product], Q2[product], Q3[product], Q4[product]]
    }));
  };
};

const deriveProductRevenueEachYear = function (product) {
  return function () {
    const { [`${decapitalize(product)}RevenueEachQuarter`]: PREQ } = this;
    return PREQ.map(({ year, result }) => ({ year, result: _sum(result) }));
  };
};

const products = ['iPhone', 'iPad', 'Mac', 'Other'];
const decapitalize = ([cap, ...rest]) => `${cap.toLowerCase()}${rest.join('')}`;

export default {
  data() {
    return {
      chartInfo,
      data,
    };
  },
  computed: {
    ...products.reduce((computedObj, product) => {
      const decapitalized = decapitalize(product);

      /* Product Revenue Each Quarter */
      const PREQ = deriveProductRevenueEachQuarter(product);
      const PREQComputedName = `${decapitalized}RevenueEachQuarter`;

      /* Product Revenue Each Year */
      const PREY = deriveProductRevenueEachYear(product);
      const PREYComputedName = `${decapitalized}RevenueEachYear`;

      const computedValues = { [PREQComputedName]: PREQ, [PREYComputedName]: PREY };
      return Object.assign(computedObj, computedValues);
    }, {}),

    totalRevenueEachQuarter() {
      const { data } = this;
      return data.map(({ year, Q1, Q2, Q3, Q4 }) => ({
        year,
        Q1: _sum(Object.values(Q1)),
        Q2: _sum(Object.values(Q2)),
        Q3: _sum(Object.values(Q3)),
        Q4: _sum(Object.values(Q4)),
      }));
    },
    totalRevenueEachYear() {
      const { totalRevenueEachQuarter: TREQ } = this;
      return TREQ.map(({ year, ...quarters }) => ({ year, result: _sum(Object.values(quarters)) }));
    },
  },
  mounted() {
    // console.log(this.iPhoneRevenueEachQuarter);
    // console.log(this.iPhoneRevenueEachYear);
    console.log(this.data);
    console.log(this.totalRevenueEachQuarter);
    console.log(this.totalRevenueEachYear);
  },
};
</script>

<style lang="sass">
@import '../../../sass/colors.sass'
section.bar-chart
  > article.infos > p > a:link
    color: $yellow-500
    font-weight: bold
    &:visited
      color: $yellow-700
    &:hover
      color: $yellow-300
</style>

<style scoped lang="sass">
@import '../../../sass/helpers.sass'
@import '../../../sass/colors.sass'
@import '../../../sass/shared.sass'
@import './_shared.sass'
</style>